<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        $this->call([
            MenuSeeder::class,
            ManagmentSeeder::class,
            ProductSeeder::class,
            ProductTypeSeeder::class,
            ProductTypeAccountSeeder::class,
            ProductSchemeAttributeSeeder::class,
            ServiceSeeder::class,
            BoardOfDirectorSeeder::class,
            CarouselSeeder::class,
            BankServiceSeeder::class,
            NewsAnnouncementSeeder::class,
            DivisionSeeder::class,
            RegionSeeder::class,
            DistrictSeeder::class,
            BranchSeeder::class,
            ContactSeeder::class,
            BranchServiceSeeder::class,
            FinancialReportSeeder::class,
            AnnualReportSeeder::class,
            FinancialHighlightSeeder::class,
            ProfitRateSeeder::class,
            ScheduleOfChargeSeeder::class,
            DownloadSeeder::class,
            CareerSeeder::class,
        ]);

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
