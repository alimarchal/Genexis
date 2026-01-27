<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected function createAdminUser()
    {
        $this->seed(\Database\Seeders\RoleAndPermissionSeeder::class);
        $user = \App\Models\User::factory()->create();
        $user->assignRole('super-admin');
        return $user;
    }
}
