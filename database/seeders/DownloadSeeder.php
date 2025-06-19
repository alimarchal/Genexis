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
                'title' => 'Tendor For Services - 21-05-2025',
                'description' => 'Tender of services document outlining bidding details
                 for specified services.',
                'file_path' => 'public/downloads/TENDORS%20FOR%20SERVICES.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 245760, // ~240KB
                'category' => 'Document',
                'is_featured' => true,
                'is_active' => true,
                'download_count' => 245,
            ],
            [
                'title' => 'Tender Of Goods - 07-03-2025',
                'description' => 'Tender of goods document detailing bidding requirements
                 for the supply of specified items.',
                'file_path' => 'public/downloads/TENDORS%20FOR%20GOODS.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 5242880, // ~5MB
                'category' => 'Document',
                'is_featured' => true,
                'is_active' => true,

                'download_count' => 1250,
            ],
            [
                'title' => 'Internship Opportunities',
                'description' => 'Explore internship opportunities to gain hands-on experience and grow your professional skills.',
                'file_path' => 'public/downloads/Internship%20Opportunities.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 512000, // ~500KB
                'category' => 'Document',
                'is_featured' => true,
                'is_active' => true,
                'download_count' => 892,
            ],
            [
                'title' => 'corrigendum',
                'description' => 'An official correction or amendment to a previously issued document or notice',
                'file_path' => 'public/downloads/corrigendum.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1048576, // ~1MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 156,
            ],
            [
                'title' => 'Tender For Services-Hairing Of Testing Service Firm - 05-06-2024',
                'description' => 'Tender for services regarding the hiring of a testing service firm, issued on 05-06-2024.',
                'file_path' => 'public/downloads/TESTING.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 2097152, // ~2MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 678,
            ],
            [
                'title' => 'Renovation of Chichian Branch Mirpur AJ&K (Single Stage Two Envelope Method). - 21-03-2024
',
                'description' => 'Tender for renovation of Chichian Branch, Mirpur AJ&K, using Single Stage Two Envelope Method, dated 21-03-2024',
                'file_path' => 'public/downloads/chichian.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 307200, // ~300KB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 234,
            ],
            [
                'title' => 'Renovation of Main Branch Rawalakot & Main
                 Branch Farword Kahota (Single stage Two Envelope Method). - 21-03-2024',
                'description' => 'Tender for renovation of Main Branch Rawalakot and Main Branch Forward Kahota, 
                using Single Stage Two Envelope Method.',
                'file_path' => 'public/gp Rawalakot.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 819200, // ~800KB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 167,
            ],
            [
                'title' => 'Tender for Services - 20-03-2024',
                'description' => 'Tender for services inviting bids from qualified firms, issued on 20-03-2024',
                'file_path' => 'public/downloads/gp%20insurance%20(1).pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
            ],
             [
                'title' => 'Account Opening Form',
                'description' => 'Form used to collect customer information for opening a new bank account',
                'file_path' => 'public/downloads/gp%20insurance%20(1).pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'form',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
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
        // Download::factory(20)->create();
    }
}
