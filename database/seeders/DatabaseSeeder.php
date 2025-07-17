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
            TopNavbarMessageSeeder::class,
            ManagementSeeder::class,
            ProductSeeder::class,           // Creates base products
            ProductTypeSeeder::class,       // Creates Asset/Liability types
            ProductTypeAccountSeeder::class, // Creates account categories
            ProfitRateSeeder::class,        // Creates profit rates
            ProductSchemeAttributeSeeder::class, // Creates schemes and attributes
            ServiceSeeder::class,
            MenuSeeder::class, // Moved after ServiceSeeder
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
            ScheduleOfChargeSeeder::class,
            DownloadSeeder::class,
            CareerSeeder::class,
            BodCommitteeSeeder::class,
            AboutUsSeeder::class,
        ]);
    }
}
