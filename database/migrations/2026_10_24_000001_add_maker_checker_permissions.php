<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    private const MAKER = 'submit changes for approval';

    private const CHECKER = 'approve changes';

    /**
     * Super-admin becomes a checker. It is deliberately not made a maker: a maker's changes are held for approval.
     */
    public function up(): void
    {
        foreach ([self::MAKER, self::CHECKER] as $name) {
            Permission::firstOrCreate(['name' => $name, 'guard_name' => 'web']);
        }

        Role::where('name', 'super-admin')->where('guard_name', 'web')->first()?->givePermissionTo(self::CHECKER);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        Permission::whereIn('name', [self::MAKER, self::CHECKER])->where('guard_name', 'web')->delete();

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
};
