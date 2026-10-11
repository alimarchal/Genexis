<?php

use App\Models\Carousel;
use App\Models\User;
use Database\Seeders\RoleAndPermissionSeeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    $this->seed(RoleAndPermissionSeeder::class);
});

function userWithPermissions(string ...$permissions): User
{
    $user = User::factory()->create();
    $user->givePermissionTo($permissions);

    return $user;
}

describe('per-action permissions on admin resources', function () {
    it('lets a view-only user read but not change records', function () {
        $user = userWithPermissions('view carousels');
        $carousel = Carousel::factory()->create();

        $this->actingAs($user)->get(route('carousels.index'))->assertOk();
        $this->actingAs($user)->get(route('carousels.show', $carousel))->assertOk();

        $this->actingAs($user)->get(route('carousels.create'))->assertForbidden();
        $this->actingAs($user)->post(route('carousels.store'), [])->assertForbidden();
        $this->actingAs($user)->get(route('carousels.edit', $carousel))->assertForbidden();
        $this->actingAs($user)->put(route('carousels.update', $carousel), [])->assertForbidden();
        $this->actingAs($user)->delete(route('carousels.destroy', $carousel))->assertForbidden();

        expect(Carousel::find($carousel->id))->not->toBeNull();
    });

    it('requires the delete permission to delete', function () {
        $limited = userWithPermissions('view carousels', 'edit carousels', 'create carousels');
        $deleter = userWithPermissions('delete carousels');
        $carousel = Carousel::factory()->create();

        $this->actingAs($limited)
            ->delete(route('carousels.destroy', $carousel))
            ->assertForbidden();

        $this->actingAs($deleter)
            ->delete(route('carousels.destroy', $carousel))
            ->assertRedirect();

        expect(Carousel::find($carousel->id))->toBeNull();
    });

    it('requires the edit permission to open the edit form', function () {
        $viewer = userWithPermissions('view carousels');
        $editor = userWithPermissions('edit carousels');
        $carousel = Carousel::factory()->create();

        $this->actingAs($viewer)
            ->get(route('carousels.edit', $carousel))->assertForbidden();

        $this->actingAs($editor)
            ->get(route('carousels.edit', $carousel))->assertOk();
    });

    it('does not let a user with no permissions into any admin resource', function () {
        $user = User::factory()->create();

        foreach (['carousels', 'news-announcements', 'branches', 'downloads', 'careers'] as $resource) {
            $this->actingAs($user)->get(route("$resource.index"))->assertForbidden();
        }
    });
});

describe('menu management', function () {
    it('is forbidden without menu permissions', function () {
        $this->actingAs(User::factory()->create())
            ->get(route('admin.menus.index'))->assertForbidden();
    });

    it('is open for viewing but not editing with only view menus', function () {
        $user = userWithPermissions('view menus');

        $this->actingAs($user)->get(route('admin.menus.index'))->assertOk();
        $this->actingAs($user)->post(route('admin.menus.reorder'), [])->assertForbidden();
        $this->actingAs($user)->post(route('admin.clear-menu-cache'))->assertForbidden();
        $this->actingAs($user)->get(route('admin.menus.create'))->assertForbidden();
    });
});

describe('privilege escalation', function () {
    it('stops a non-super-admin from creating a super-admin', function () {
        $actor = userWithPermissions('create users');
        $superAdminRole = Role::findByName('super-admin');

        $this->actingAs($actor)->post(route('admin.users.store'), [
            'name' => 'Sneaky',
            'email' => 'sneaky@example.test',
            'password' => 'password123',
            'roles' => [$superAdminRole->id],
        ])->assertForbidden();

        expect(User::where('email', 'sneaky@example.test')->exists())->toBeFalse();
    });

    it('stops a user from granting permissions they do not hold', function () {
        $actor = userWithPermissions('create users');
        $foreign = Permission::findByName('delete carousels');

        $this->actingAs($actor)->post(route('admin.users.store'), [
            'name' => 'Granted',
            'email' => 'granted@example.test',
            'password' => 'password123',
            'permissions' => [$foreign->id],
        ])->assertForbidden();
    });

    it('allows granting permissions the actor already holds', function () {
        $actor = userWithPermissions('create users', 'view carousels');
        $owned = Permission::findByName('view carousels');

        $this->actingAs($actor)->post(route('admin.users.store'), [
            'name' => 'Legit',
            'email' => 'legit@example.test',
            'password' => 'password123',
            'permissions' => [$owned->id],
        ])->assertRedirect(route('admin.users.index'));

        expect(User::where('email', 'legit@example.test')->first()->can('view carousels'))->toBeTrue();
    });

    it('stops a non-super-admin from editing or deleting a super-admin', function () {
        $actor = userWithPermissions('edit users', 'delete users');
        $admin = User::factory()->create();
        $admin->assignRole('super-admin');
        $second = User::factory()->create();
        $second->assignRole('super-admin');

        $this->actingAs($actor)->put(route('admin.users.update', $admin), [
            'name' => 'Hijacked',
            'email' => 'hijack@example.test',
            'password' => 'newpassword123',
            'roles' => [Role::findByName('super-admin')->id],
        ])->assertForbidden();

        $this->actingAs($actor)->delete(route('admin.users.destroy', $admin))->assertForbidden();

        expect($admin->fresh()->email)->not->toBe('hijack@example.test');
    });

    it('lets a super-admin manage users and roles as before', function () {
        $root = User::factory()->create();
        $root->assignRole('super-admin');

        $this->actingAs($root)->post(route('admin.users.store'), [
            'name' => 'Another Root',
            'email' => 'root2@example.test',
            'password' => 'password123',
            'roles' => [Role::findByName('super-admin')->id],
        ])->assertRedirect(route('admin.users.index'));

        expect(User::where('email', 'root2@example.test')->first()->hasRole('super-admin'))->toBeTrue();
    });

    it('stops a role editor from granting permissions they do not hold', function () {
        $actor = userWithPermissions('create roles', 'edit roles', 'view carousels');
        $foreign = Permission::findByName('delete users');

        $this->actingAs($actor)->post(route('admin.roles.store'), [
            'name' => 'power-role',
            'permissions' => [$foreign->id],
        ])->assertForbidden();

        $role = Role::create(['name' => 'editor-role', 'guard_name' => 'web']);
        $this->actingAs($actor)->put(route('admin.roles.update', $role), [
            'name' => 'editor-role',
            'permissions' => [$foreign->id],
        ])->assertForbidden();
    });

    it('never allows the super-admin role to be renamed or have permissions changed by a non super-admin', function () {
        $actor = userWithPermissions('edit roles');
        $superAdminRole = Role::findByName('super-admin');

        $this->actingAs($actor)->put(route('admin.roles.update', $superAdminRole), [
            'name' => 'renamed',
            'permissions' => [],
        ])->assertForbidden();

        expect(Role::where('name', 'super-admin')->exists())->toBeTrue();
    });

    it('does not even let a super-admin rename the super-admin role', function () {
        $root = User::factory()->create();
        $root->assignRole('super-admin');
        $role = Role::findByName('super-admin');

        $this->actingAs($root)->put(route('admin.roles.update', $role), [
            'name' => 'renamed',
            'permissions' => [],
        ])->assertSessionHasErrors('name');

        expect(Role::where('name', 'super-admin')->exists())->toBeTrue();
    });
});
