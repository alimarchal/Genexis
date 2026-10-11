<?php

namespace App\Traits;

use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

/**
 * Prevents users from handing out more access than they hold themselves.
 * Super-admins are exempt (they pass every gate).
 */
trait GuardsPrivilegeEscalation
{
    protected function actingUserIsSuperAdmin(): bool
    {
        return (bool) auth()->user()?->hasRole('super-admin');
    }

    /**
     * Abort with 403 unless the acting user may assign these roles and permissions.
     *
     * @param  array<int, int|string>  $roleIds
     * @param  array<int, int|string>  $permissionIds
     */
    protected function authorizeGrant(array $roleIds = [], array $permissionIds = []): void
    {
        if ($this->actingUserIsSuperAdmin()) {
            return;
        }

        $held = auth()->user()->getAllPermissions()->pluck('id')->all();

        $roles = Role::with('permissions')->whereIn('id', $roleIds)->get();

        abort_if($roles->contains('name', 'super-admin'), 403, 'Only a super-admin can assign the super-admin role.');

        $requested = $roles->flatMap(fn (Role $role) => $role->permissions->pluck('id'))
            ->merge(Permission::whereIn('id', $permissionIds)->pluck('id'))
            ->unique();

        abort_if($requested->diff($held)->isNotEmpty(), 403, 'You cannot grant permissions you do not hold.');
    }

    /**
     * Only a super-admin may modify or remove another super-admin.
     */
    protected function authorizeTouchingUser(User $target): void
    {
        abort_if(
            $target->hasRole('super-admin') && ! $this->actingUserIsSuperAdmin(),
            403,
            'Only a super-admin can modify a super-admin account.'
        );
    }
}
