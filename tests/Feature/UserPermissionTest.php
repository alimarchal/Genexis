<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserPermissionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        // Run the seeder to set up roles and permissions
        $this->seed(RoleAndPermissionSeeder::class);
    }

    public function test_public_routes_are_accessible()
    {
        // Public home page
        $response = $this->get('/');
        $response->assertStatus(200);

        // Contact page
        $response = $this->get('/contact-us');
        $response->assertStatus(200);
    }

    public function test_admin_routes_are_protected_by_default()
    {
        $user = User::factory()->create();

        // Try to access Products (requires 'view products')
        $response = $this->actingAs($user)->get(route('product.index'));
        $response->assertStatus(403);

        // Try to access Users (requires 'view users')
        $response = $this->actingAs($user)->get(route('admin.users.index'));
        $response->assertStatus(403);
    }

    public function test_super_admin_has_full_access()
    {
        // Create super admin user as defined in Seeder logic
        $superAdmin = User::factory()->create(['email' => 'ali.marchal@bankajk.com']);
        $superAdmin->assignRole('super-admin');

        // Access Products
        $response = $this->actingAs($superAdmin)->get(route('product.index'));
        $response->assertStatus(200); // 200 OK (Inertia page)

        // Access User Management
        $response = $this->actingAs($superAdmin)->get(route('admin.users.index'));
        $response->assertStatus(200);
    }

    public function test_granular_permission_access()
    {
        $user = User::factory()->create();

        // Confirm access denied first
        $this->actingAs($user)->get(route('product.index'))->assertStatus(403);

        // Grant specific permission
        $user->givePermissionTo('view products');

        // Confirm access granted now
        $this->actingAs($user)->get(route('product.index'))->assertStatus(200);

        // Access denied for other modules (e.g. Services)
        $this->actingAs($user)->get(route('services.index'))->assertStatus(403);
    }

    public function test_role_based_access()
    {
        $user = User::factory()->create();

        // Create a custom role
        $role = Role::create(['name' => 'Product Manager', 'guard_name' => 'web']);
        $role->givePermissionTo(['view products', 'create products']);

        $user->assignRole($role);

        // Should access products
        $this->actingAs($user)->get(route('product.index'))->assertStatus(200);

        // Should NOT access users
        $this->actingAs($user)->get(route('admin.users.index'))->assertStatus(403);
    }

    public function test_permissions_are_shared_with_inertia()
    {
        $user = User::factory()->create();
        $user->givePermissionTo('view products');

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertInertia(
            fn($page) => $page
                ->has('auth.permissions')
                ->where('auth.permissions', function ($permissions) {
                    return in_array('view products', $permissions->toArray());
                })
        );
    }
}
