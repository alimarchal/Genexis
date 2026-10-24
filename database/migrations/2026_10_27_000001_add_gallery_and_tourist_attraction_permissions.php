<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * @return list<string>
     */
    private function permissions(): array
    {
        return collect(['gallery albums', 'tourist attractions'])
            ->flatMap(fn (string $module) => collect(['view', 'create', 'edit', 'delete'])->map(fn (string $action) => "{$action} {$module}"))
            ->all();
    }

    public function up(): void
    {
        foreach ($this->permissions() as $name) {
            Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web']);
        }

        Role::where('name', 'super-admin')->where('guard_name', 'web')->first()?->givePermissionTo($this->permissions());

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        Permission::whereIn('name', $this->permissions())->where('guard_name', 'web')->delete();

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
};
