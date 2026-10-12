<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * Super-admin used to bypass every check through a Gate::before hook. That hook is gone, so the
     * role is given every existing permission once, after which it can be edited like any other role.
     */
    public function up(): void
    {
        $role = Role::where('name', 'super-admin')->where('guard_name', 'web')->first();

        if ($role) {
            $role->givePermissionTo(Permission::where('guard_name', 'web')->get());
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        //
    }
};
