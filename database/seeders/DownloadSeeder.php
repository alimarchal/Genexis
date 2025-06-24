<?php

namespace Database\Seeders;

use App\Models\Download;
use Illuminate\Database\Seeder;

class DownloadSeeder extends Seeder
{
    public function run(): void
    {
        // Create specific downloads
        $downloads = [
            [
                'title' => 'Account Opening Form',
                'description' => 'Complete this form to open a new account with BAJK',
                'file_path' => 'downloads/account-opening-form.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 245760, // ~240KB
                'category' => 'forms',
                'is_featured' => true,
                'is_active' => true,
                'download_count' => 245,
            ],
            [
                'title' => 'Annual Report 2024',
                'description' => 'Comprehensive annual report showcasing our financial performance and achievements',
                'file_path' => 'downloads/annual-report-2024.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 5242880, // ~5MB
                'category' => 'reports',
                'is_featured' => true,
                'is_active' => true,
                'download_count' => 1250,
            ],
            [
                'title' => 'Loan Application Form',
                'description' => 'Apply for personal, business, or home loans using this comprehensive form',
                'file_path' => 'downloads/loan-application-form.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 512000, // ~500KB
                'category' => 'forms',
                'is_featured' => true,
                'is_active' => true,
                'download_count' => 892,
            ],
            [
                'title' => 'Banking Services Brochure',
                'description' => 'Learn about our comprehensive range of banking products and services',
                'file_path' => 'downloads/services-brochure.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1048576, // ~1MB
                'category' => 'brochures',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 156,
            ],
            [
                'title' => 'Digital Banking Guide',
                'description' => 'Step-by-step guide to using our online and mobile banking services',
                'file_path' => 'downloads/digital-banking-guide.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 2097152, // ~2MB
                'category' => 'brochures',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 678,
            ],
            [
                'title' => 'Interest Rate Policy',
                'description' => 'Current interest rates and policy guidelines for various banking products',
                'file_path' => 'downloads/interest-rate-policy.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 307200, // ~300KB
                'category' => 'policies',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 234,
            ],
            [
                'title' => 'Financial Highlights Q4 2024',
                'description' => 'Key financial metrics and performance indicators for the fourth quarter',
                'file_path' => 'downloads/financial-highlights-q4-2024.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 819200, // ~800KB
                'category' => 'reports',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 167,
            ],
            [
                'title' => 'Mobile App User Manual',
                'description' => 'Complete user manual for our mobile banking application',
                'file_path' => 'downloads/mobile-app-manual.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'general',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
            ],
        ];

        foreach ($downloads as $download) {
            Download::create(array_merge($download, [
                'created_by' => 1,
                'updated_by' => 1,
            ]));
        }

        // Create additional random downloads
        Download::factory(20)->create();
    }
}
