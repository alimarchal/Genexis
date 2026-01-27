<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('can:view users', only: ['index', 'show']),
            new Middleware('can:create users', only: ['create', 'store']),
            new Middleware('can:edit users', only: ['edit', 'update']),
            new Middleware('can:delete users', only: ['destroy']),
        ];
    }

    public function index(Request $request)
    {
        $query = User::with(['roles', 'permissions']);

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create', [
            'roles' => Role::all(),
            'permissions' => Permission::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Assign roles
            if ($request->filled('roles')) {
                $roleNames = Role::whereIn('id', $request->roles)->pluck('name')->toArray();
                $user->syncRoles($roleNames);
            }

            // Assign direct permissions
            if ($request->filled('permissions')) {
                $permissionNames = Permission::whereIn('id', $request->permissions)->pluck('name')->toArray();
                $user->syncPermissions($permissionNames);
            }
        });

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user->load(['roles', 'permissions']),
            'roles' => Role::all(),
            'permissions' => Permission::all(),
            'userRoles' => $user->roles->pluck('id'),
            'userPermissions' => $user->permissions->pluck('id'),
            // Permissions inherited via roles, helpful for UI logic
            'inheritedPermissions' => $user->getPermissionsViaRoles()->pluck('id'),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        // Prevent removing super-admin role from the last super-admin
        if ($user->hasRole('super-admin')) {
            // Check if the user is trying to remove the super-admin role
            // Note: This logic assumes 'roles' matches the submitted Checkbox IDs.
            // If we're using names, we'd need to map. Validated as IDs above.
            $superAdminRole = Role::where('name', 'super-admin')->first();
            $submittedRoleIds = $request->input('roles', []);

            if ($superAdminRole && !in_array($superAdminRole->id, $submittedRoleIds)) {
                // Trying to remove super-admin role
                // Check if this is the user themselves (usually prevented) or check count.
                // Ideally, enforce that at least one SA exists.
                if (User::role('super-admin')->count() <= 1) {
                    return back()->withErrors(['roles' => 'Cannot remove super-admin role from the last super-admin.']);
                }
            }
        }

        DB::transaction(function () use ($request, $user) {
            $data = [
                'name' => $request->name,
                'email' => $request->email,
            ];

            if ($request->filled('password')) {
                $data['password'] = Hash::make($request->password);
            }

            $user->update($data);

            // Sync Roles
            if ($request->has('roles')) {
                $roleNames = Role::whereIn('id', $request->roles)->pluck('name')->toArray();
                $user->syncRoles($roleNames);
            } else {
                $user->syncRoles([]);
            }

            // Sync Direct Permissions
            if ($request->has('permissions')) {
                $permissionNames = Permission::whereIn('id', $request->permissions)->pluck('name')->toArray();
                $user->syncPermissions($permissionNames);
            } else {
                $user->syncPermissions([]);
            }
        });

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->withErrors(['error' => 'Cannot delete your own account.']);
        }

        if ($user->hasRole('super-admin') && User::role('super-admin')->count() <= 1) {
            return back()->withErrors(['error' => 'Cannot delete the last super-admin.']);
        }

        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }
}
