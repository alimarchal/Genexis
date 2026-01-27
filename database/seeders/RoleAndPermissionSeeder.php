<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Comprehensive list of permissions based on dashboard routes
        $permissions = [
            // User & Role Management (System)
            'view users',
            'create users',
            'edit users',
            'delete users',
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            'view permissions',
            'create permissions',
            'edit permissions',
            'delete permissions',
            'assign permissions',

            // Homepage Content
            'view carousels',
            'create carousels',
            'edit carousels',
            'delete carousels',
            'view bank services',
            'create bank services',
            'edit bank services',
            'delete bank services',
            'view news announcements',
            'create news announcements',
            'edit news announcements',
            'delete news announcements',
            'view top navbar messages',
            'create top navbar messages',
            'edit top navbar messages',
            'delete top navbar messages',
            'view menus',
            'create menus',
            'edit menus',
            'delete menus',

            // Organizational Structure
            'view managements',
            'create managements',
            'edit managements',
            'delete managements',
            'view board of directors',
            'create board of directors',
            'edit board of directors',
            'delete board of directors',
            'view bod committees',
            'create bod committees',
            'edit bod committees',
            'delete bod committees',
            'view about us',
            'create about us',
            'edit about us',
            'delete about us',

            // Product & Service Management
            'view products',
            'create products',
            'edit products',
            'delete products',
            'view product types',
            'create product types',
            'edit product types',
            'delete product types',
            'view product type accounts',
            'create product type accounts',
            'edit product type accounts',
            'delete product type accounts',
            'view product schemes',
            'create product schemes',
            'edit product schemes',
            'delete product schemes',
            'view product scheme attributes',
            'create product scheme attributes',
            'edit product scheme attributes',
            'delete product scheme attributes',
            'view services',
            'create services',
            'edit services',
            'delete services',
            'view service attributes',
            'create service attributes',
            'edit service attributes',
            'delete service attributes',

            // Financial Reports & Documents
            'view financial reports',
            'create financial reports',
            'edit financial reports',
            'delete financial reports',
            'view annual reports',
            'create annual reports',
            'edit annual reports',
            'delete annual reports',
            'view financial highlights',
            'create financial highlights',
            'edit financial highlights',
            'delete financial highlights',
            'view profit rates',
            'create profit rates',
            'edit profit rates',
            'delete profit rates',
            'view schedule of charges',
            'create schedule of charges',
            'edit schedule of charges',
            'delete schedule of charges',
            'view downloads',
            'create downloads',
            'edit downloads',
            'delete downloads',

            // Geographic & Branch Management
            'view regions',
            'create regions',
            'edit regions',
            'delete regions',
            'view districts',
            'create districts',
            'edit districts',
            'delete districts',
            'view branches',
            'create branches',
            'edit branches',
            'delete branches',
            'view branch services',
            'create branch services',
            'edit branch services',
            'delete branch services',

            // Communication & Contacts
            'view contacts',
            'create contacts',
            'edit contacts',
            'delete contacts',
            'view careers',
            'create careers',
            'edit careers',
            'delete careers',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create roles

        // Super Admin
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin', 'guard_name' => 'web']);
        // Super admin gets all permissions via Gate::before in AppServiceProvider

        // Admin (Default example role)
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        // Assign some default permissions to admin if needed, or leave empty for now till configured in UI
        $adminRole->givePermissionTo([
            'view users',
            'view roles',
            'view permissions',
        ]);

        // User
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);

        // Assign Super Admin role to specific user
        $user = User::where('email', 'ali.marchal@bankajk.com')->first();
        if ($user) {
            $user->syncRoles($superAdminRole); // Use syncRoles to ensure they only have this role if that's desired, or assignRole to add.
        }
    }
}
