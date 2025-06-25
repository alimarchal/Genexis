<?php

namespace Database\Seeders;

use App\Models\Download;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
class DownloadSeeder extends Seeder
{
    public function run(): void
    {
        // Create specific downloads
        $downloads = [
               [
                'title' => 'Tendor For Services',
                'description' => 'Tender of services document outlining bidding details for specified services.',
                'file_path' => 'public/downloads/TENDORS%20FOR%20SERVICES.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 245760, // ~240KB
                'category' => 'Document',
                'is_featured' => true,
                'is_active' => true,
                'download_count' => 245,
                'created_at' => Carbon::parse('2025-05-21 10:00:00'),
                'updated_at' => Carbon::parse('2025-05-21 10:00:00'),
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
                'created_at' => Carbon::parse('2025-03-07 10:00:00'),
                'updated_at' => Carbon::parse('2025-03-07 10:00:00'),

               
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
                'title' => 'Tender For Services-Hairing Of Testing Service Firm ',
                'description' => 'Tender for services regarding the hiring of a testing service firm, issued on 05-06-2024.',
                'file_path' => 'public/downloads/TESTING.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 2097152, // ~2MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 678,
                 'created_at' => Carbon::parse('2024-06-05 10:00:00'),
                'updated_at' => Carbon::parse('2024-06-05 10:00:00'),
            ],



            [


            'title' => 'Renovation of Chichian Branch Mirpur AJ&K (Single Stage Two Envelope Method). - 21-03-2024.',
             'description' => 'Tender for renovation of Chichian Branch, Mirpur AJ&K, using Single Stage Two Envelope Method, dated 21-03-2024',
                'file_path' => 'public/downloads/chichian.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 307200, // ~300KB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 234,
                'created_at' => Carbon::parse('2024-03-21 10:00:00'),
                'updated_at' => Carbon::parse('2024-03-21 10:00:00'),
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
                 'created_at' => Carbon::parse('2024-03-21 10:00:00'),
                'updated_at' => Carbon::parse('2024-03-21 10:00:00'),
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
                'created_at' => Carbon::parse('2024-03-20 10:00:00'),
                'updated_at' => Carbon::parse('2024-03-20 10:00:00'),
            ],
             [
                'title' => 'Account Opening Form',
                'description' => 'Form used to collect customer information for opening a new bank account',
                'file_path' => 'public/downloads/gp%20insurance%20(1).pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'form',
                'is_featured' => true,
                'is_active' => true,
                'download_count' => 423,
            ],
             [
                'title' => 'CORRIGENDUM - Hiring of Consultants for Archaitectural Planning.',
                'description' => 'Corrigendum regarding the hiring of consultants for architectural planning, dated 06-03-2024.',
                'file_path' => 'downloads/CORRIGENDUM2.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
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
                 'created_at' => Carbon::parse('2024-03-20 10:00:00'),
                 'updated_at' => Carbon::parse('2024-03-20 10:00:00'),
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
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2024-03-06 10:00:00'),
                'updated_at' => Carbon::parse('2024-03-06 10:00:00'),
            ],
            [
                'title' => 'CORRIGENDUM - Hiring of Consultants for Architectural Planning.',
                'description' => 'Corrigendum regarding the hiring of consultants for architectural planning.',
                'file_path' => 'public/downloads/CORRIGENDUM%20(1).pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2024-03-04 10:00:00'),
                'updated_at' => Carbon::parse('2024-03-04 10:00:00'),
            ],
            [
                'title' => 'Hiring of Consultants for Architectural Planning/Design, Detailed Engineering Design, Demolishing and Construction Supervision',
                'description' => 'Tender for hiring consultants for architectural planning, engineering design, demolishing, and construction supervision, dated 28-02-2024',
                'file_path' => 'public/downloads/advertise%20construction.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Dcument',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2024-02-28 10:00:00'),
                'updated_at' => Carbon::parse('2024-02-28 10:00:00'),
            ],
            
            [
                'title' => 'Internship Opportunities ',
                'description' => 'Internship opportunities for 2024 to support skill development and practical experience, announced on 15-02-2024',
                'file_path' => 'public/downloads/Internship%20Opportunities%20(1).pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2024-02-15 10:00:00'),
                'updated_at' => Carbon::parse('2024-02-15 10:00:00'),
            ],
            [
                'title' => 'Carrer Opportunities ',
                'description' => 'Career opportunities announced on 15-02-2024 for various professional roles within the organization.',
                'file_path' => 'public/downloads/Career%20Opportunities.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2024-02-15 10:00:00'),
                'updated_at' => Carbon::parse('2024-02-15 10:00:00'),
             
            ],
            [
                'title' => 'Corrigendum - Carrer Opportunities - ',
                'description' => '',
                'file_path' => 'public/downloads/WhatsApp%20Image%202024-02-12%20at%2010.54.30%20AM.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2024-02-12 10:00:00'),
                'updated_at' => Carbon::parse('2024-02-12 10:00:00'),
            ],
        [
                'title' => 'Corrigendum - Hiring of security services ',
                'description' => 'Corrigendum issued on 22-01-2024 regarding the hiring of security services',
                'file_path' => 'public/downloads/pic.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'pic',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2024-01-22 10:00:00'),
                'updated_at' => Carbon::parse('2024-01-22 10:00:00'),
            ],
           [
                'title' => 'IPAD - Tender AJK BANK BAJK ',
                'description' => 'Tender issued by AJK Bank for iPads procurement, dated 29-12-2023.',
                'file_path' => 'public/downloads/IPAD%20-%20Tender%20AJK%20BANK%20BAJK.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-12-29 10:00:00'),
                'updated_at' => Carbon::parse('2023-12-29  10:00:00'),
            ],
             [
                'title' => 'SECURITY SERVICES - Tender AJK BANK BAJK ',
                'description' => 'Tender issued by AJK Bank for the provision of security services, dated 29-12-2023',
                'file_path' => 'public/downloads/SECURITY%20SERVICES%20-%205220%20Tender%20AJK%20BANK%20BAJK.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-12-29 10:00:00'),
                 'updated_at' => Carbon::parse('2023-12-29 10:00:00'),
            ],
            [
                'title' => 'JANITORIAL SERVICES - Tender AJK BANK BAJK ',
                'description' => '',
                'file_path' => 'public/downloads/JANITORIAL%20SERVICES%20-%205221%20Tender%20AJK%20BANK%20BAJK.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-12-29 10:00:00'),
               'updated_at' => Carbon::parse('2023-12-29 10:00:00'),
            ],
            [
                'title' => 'Invitation To Bids ',
                'description' => 'Invitation to submit sealed bids for procurement opportunities announced on 06-12-2023.',
                'file_path' => 'public/downloads/invitationtobids.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-12-06 10:00:00'),
                'updated_at' => Carbon::parse('2023-12-06 10:00:00'),
            ],
[
                'title' => 'Tender For Services Hiring Of Services Of 3rd Party Headhunting Officers/Executive Search ',
                'description' => 'Tender for hiring third-party headhunting services for recruitment of officers/executives, announced on November 8th, 2023.',
                'file_path' => 'public/downloads/3rd Party AD.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-11-08 10:00:00'),
                'updated_at' => Carbon::parse('2023-11-08 10:00:00'),

            ],
            [
                'title' => 'Tender Notice for Renovation of Islamic Banking Branch at Goira Bypass Road Muzaffarabad ',
                'description' => 'Tender notice for renovation works at the Islamic Banking Branch located at Goira Bypass Road, Muzaffarabad, announced on October 10th, 2023.',
                'file_path' => 'public/downloads/islmibranch.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-10-10 10:00:00'),
                'updated_at' => Carbon::parse('2023-10-10 10:00:00'),
            ],
            [
                'title' => 'Printing and Supply of Security Stationery ',
                'description' => 'Tender for printing and supply of security stationery, announced on August 3rd, 2023.',
                'file_path' => 'public/downloads/securitystationary.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-08-03 10:00:00'),
                'updated_at' => Carbon::parse('2023-08-03 10:00:00'),
            ],
            [
                'title' => 'Text Messages Broadcasting Services (SMS alerts for transactions) ',
                'description' => 'Tender for text message broadcasting services (SMS alerts for transactions), announced on August 3rd, 2023.',
                'file_path' => 'public/downloads/advertisement.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-08-03 10:00:00'),
                'updated_at' => Carbon::parse('2023-08-03 10:00:00'),
            ],
            [
                'title' => 'Corrigendum ',
                'description' => 'Corrigendum notice regarding previously published tender(s), issued on June 8th, 2023.',
                'file_path' => 'public/downloads/image.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-06-08 10:00:00'),
                'updated_at' => Carbon::parse('2023-06-08 10:00:00'),
            ],
             [
                'title' => 'Invitation to Bids ',
                'description' => 'Invitation to submit sealed bids for procurement opportunities, announced on June 2nd, 2023.',
                'file_path' => 'public/downloads/bids.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-06-02 10:00:00'),
                'updated_at' => Carbon::parse('2023-06-02 10:00:00'),
            ],
             [
                'title' => 'Invitation to Bids ',
                'description' => 'Invitation to submit sealed bids for procurement opportunities, announced on May 22nd, 2023.',
                'file_path' => 'public/downloads/bids2.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-05-22 10:00:00'),
                'updated_at' => Carbon::parse('2023-05-22 10:00:00'),
            ],
             [
                'title' => 'Tender for Services ',
                'description' => 'Tender for hiring professional services, announced on May 18th, 2023.',
                'file_path' => 'public/downloads/bids3.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-05-18 10:00:00'),
                'updated_at' => Carbon::parse('2023-05-18  10:00:00'),
            ],
             [
                'title' => 'Tender for Services ',
                'description' => 'Tender for provision of professional services, announced on May 4th, 2023.',
                'file_path' => 'public/downloads/intern.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-05-04 10:00:00'),
                'updated_at' => Carbon::parse('2023-05-0 10:00:00'),

            ],
             [
                'title' => 'Invitation to Bid ',
                'description' => 'Invitation to submit bids for procurement opportunities, announced on April 27th, 2023.',
                'file_path' => 'public/downloads/bidsadd.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-04-27 10:00:00'),
                'updated_at' => Carbon::parse('2023-04-27 10:00:00'),
            ],
             [
                'title' => 'Invitation to Bid ',
                'description' => 'Invitation to submit bids for procurement opportunities, announced on April 4th, 2023.',
                'file_path' => 'public/downloads/bids4.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-04-27 10:00:00'),
                'updated_at' => Carbon::parse('2023-04-27 10:00:00'),
            ],
             [
                'title' => 'Invitation to Bid',
                'description' => 'Invitation to submit bids for procurement opportunities, announced on February 6th, 2023.',
                'file_path' => 'public/downloads/bids5.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-02-06 10:00:00'),
                'updated_at' => Carbon::parse('2023-02-06 10:00:00'),
            ],
             [
                'title' => 'Invitation to Bid ',
                'description' => 'Invitation to submit bids for procurement opportunities, announced on January 23rd, 2023.',
                'file_path' => 'public/downloads/invitationtobids2023.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-01-23 10:00:00'),
                'updated_at' => Carbon::parse('2023-01-23  10:00:00'),
            ],

 [
                'title' => 'HISTORICAL BUSINESS RESULTS & BUSINESS STRATEGY - 2023 - January 17th, 2023',
                'description' => 'Publication of Historical Business Results and Business Strategy for the year 2023, released on January 17th, 2023.',
                'file_path' => 'public/downloads/Historical Business Results 2022 and Business Strategy 2023.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2023-01-17 10:00:00'),
                'updated_at' => Carbon::parse('023-01-17 10:00:00'),
            ],

             [
                'title' => 'Tender for Group Health Insurance - December 23rd, 2022',
                'description' => 'Tender for provision of group health insurance services, announced on December 23rd, 2022.',
                'file_path' => 'public/downloads/health.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-12-23 10:00:00'),
                'updated_at' => Carbon::parse('2022-12-23  10:00:00'),
            ],
            [
                'title' => 'Re-Tender - December 16th, 2022',
                'description' => 'Re-tender notice for previously advertised procurement opportunity, issued on December 16th, 2022.',
                'file_path' => 'public/downloads/december16-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-12-16 10:00:00'),
                'updated_at' => Carbon::parse('2022-12-16 10:00:00'),
            ],
            [
                'title' => 'Re-Tender - November 16th, 2022',
                'description' => 'Re-tender notice for a previously issued procurement, announced on November 16th, 2022.',
                'file_path' => 'public/downloads/Nov16-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-11-16 10:00:00'),
                'updated_at' => Carbon::parse('2022-11-16 10:00:00'),
            ],
             [
                'title' => 'Purchase of 30 Desktop Computers - October 06th, 2022',
                'description' => 'Tender for the purchase of 30 desktop computers, announced on October 6th, 2022.',
                'file_path' => 'public/downloads/oct-6-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-10-06 10:00:00'),
                'updated_at' => Carbon::parse('2022-10-06 10:00:00'),
            ],
              [
                'title' => 'Re-Tender Purchase of 25 Generators (5KVA Petrol) - October 06th, 2022',
                'description' => 'Re-tender for the purchase of 25 petrol-powered 5KVA generators, announced on October 6th, 2022.',
                'file_path' => 'public/downloads/Rerenderoct06-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-10-06 10:00:00'),
               'updated_at' => Carbon::parse('2022-10-06 10:00:00'),
            ],
             [
                'title' => 'Tender Notice for Renovation - September 30th, 2022',
                'description' => 'Tender notice for renovation works, announced on September 30th, 2022.',
                'file_path' => 'public/downloads/sep30-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-09-30 10:00:00'),
                'updated_at' => Carbon::parse('2022-09-30 10:00:00'),
            ],


 [
                'title' => 'Invitation To Bid For Purchase of Software - September 14th, 2022',
                'description' => 'Invitation to bid for the purchase of software solutions, announced on September 14th, 2022.',
                'file_path' => 'public/downloads/Corrigendum Tender sep -14- 2023.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-09-14 10:00:00'),
               'updated_at' => Carbon::parse('2022-09-14 10:00:00'),
            ],


 [
                'title' => 'Career Opportunities - September 13th, 2022',
                'description' => 'Announcement of career opportunities, published on September 13th, 2022.',
                'file_path' => 'public/downloads/BAJK HO HRMD 2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-09-13 10:00:00'),
                'updated_at' => Carbon::parse('2022-09-13 10:00:00'),
            ],


 [
                'title' => 'Corrigendum - August 19th, 2022',
                'description' => 'Corrigendum notice for previously issued tender, published on August 19th, 2022.',
                'file_path' => 'public/downloads/BAJK HO OPS 19 2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-08-19 10:00:00'),
                'updated_at' => Carbon::parse('2022-08-19 10:00:00'),
            ],

 [
                'title' => 'Re-Tender - August 11th, 2022',
                'description' => 'Re-tender notice for a previously advertised procurement, announced on August 11th, 2022.',
                'file_path' => 'public/downloads/BAJK HO OPS aug-11-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-08-11 10:00:00'),
                'updated_at' => Carbon::parse('2022-08-11 10:00:00'),
            ],


 [
                'title' => 'Invitation to Bid For Purchase of Software - August 11th, 2022',
                'description' => 'Invitation to bid for the procurement of software solutions, announced on August 11th, 2022.',
                'file_path' => 'public/downloads/BAJK HO OPS 2022 352.pdf',
                'file_type' => 'application/',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-08-11 10:00:00'),
               'updated_at' => Carbon::parse('2022-08-11 10:00:00'),
            ],


 [
                'title' => 'Re-Tender Tender for Services - August 05th, 2022',
                'description' => 'Re-tender notice for provision of services, announced on August 5th, 2022.',
                'file_path' => 'public/downloads/New Doc 08-05-2022 .pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-08-05 10:00:00'),
                 'updated_at' => Carbon::parse('2022-08-05 10:00:00'),
            ],
             [
                'title' => 'Invitation to Bid For Purchase of Software - July 29th, 2022',
                'description' => 'Invitation to bid for the purchase of software solutions, announced on July 29th, 2022.',
                'file_path' => 'public/downloads/BAJK H0 july 29 2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-07-29 10:00:00'),
                'updated_at' => Carbon::parse('2022-07-29 10:00:00'),
            ],
             [
                'title' => 'Tender for Services - July 21st, 2022',
                'description' => 'Tender for provision of services, announced on July 21st, 2022.',
                'file_path' => 'public/downloads/july-21-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Documet',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-07-21 10:00:00'),
                'updated_at' => Carbon::parse('2022-07-21 10:00:00'),
            ],
             [
                'title' => 'Hiring of Services of Third Party Recruitment Firm - July 15th, 2022',
                'description' => 'Tender for hiring the services of a third-party recruitment firm, announced on July 15th, 2022.',
                'file_path' => 'public/downloads/july-15-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-07-15 10:00:00'),
                'updated_at' => Carbon::parse('2022-07-15 10:00:00'),
            ],
             [
                'title' => 'Tender for Services - June 28th, 2022',
                'description' => 'Tender for provision of services, announced on June 28th, 2022.',
                'file_path' => 'public/downloads/Tender for Services for change management june-28-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-06-28 10:00:00'),
                'updated_at' => Carbon::parse('2022-06-28 10:00:00'),
            ],
             [
                'title' => 'Request For Expression Of Interest - June 27th, 2022',
                'description' => 'Request for Expression of Interest (EOI) for potential service providers, announced on June 27th, 2022.',
                'file_path' => 'public/downloads/doc.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-06-27 10:00:00'),
                'updated_at' => Carbon::parse('2022-06-27 10:00:00'),
            ],
             [
                'title' => 'Renovation Of Two Halls At Dam Plaza Bank Road Muzaffarabad - June 27th, 2022',
                'description' => 'Tender for renovation of two halls at Dam Plaza, Bank Road, Muzaffarabad, announced on June 27th, 2022.',
                'file_path' => 'public/downloads/doc2.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-06-27 10:00:00'),
                'updated_at' => Carbon::parse('2022-06-27 10:00:00'),
            ],
            
             [
                'title' => 'Request for Expression of Intrest - June 15th, 2022',
                'description' => 'Request for Expression of Interest (EOI) for potential service providers, announced on June 15th, 2022.',
                'file_path' => 'public/downloads/BAJK HO OPS june 15 2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-06-15 10:00:00'),
                'updated_at' => Carbon::parse('2022-06-15 10:00:00'),
            ],
            

            [
                'title' => 'Invitation to Bids - June 10th, 2022',
                'description' => 'Invitation to submit sealed bids for procurement opportunities, announced on June 10th, 2022.',
                'file_path' => 'public/downloads/june-10-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-06-10 10:00:00'),
               'updated_at' => Carbon::parse('2022-06-10 10:00:00'),
            ],
            

            [
                'title' => 'Invitation to Bids - June 10th, 2022',
                'description' => 'Invitation to submit sealed bids for procurement opportunities, announced on June 10th, 2022.',
                'file_path' => 'public/downloads/BAJK HO HRMD june-10-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-06-10 10:00:00'),
                'updated_at' => Carbon::parse('2022-06-10 10:00:00'),
            ],
            
            [
                'title' => 'Evaluation Report -4, Bank of AJK',
                'description' => 'Evaluation Report - 4 for procurement or tendering process at Bank of AJK, detailing assessment results and decisions.',
                'file_path' => 'public/downloads/BAJK HO HRMD 2022 PPRA Ref 3968--evaluation-4.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
               
            ],
            [
                'title' => 'Evaluation Report -3, Bank of AJK',
                'description' => 'Evaluation Report - 3 for the Bank of AJK, 
                outlining the evaluation findings and 
                recommendations from the procurement or tender process.',
                'file_path' => 'public/downloads/BAJK HO HRMD 2022 PPRA 3967--evaluation-3.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                
            ],
            [
                'title' => 'Evaluation Report -2, Bank of AJK',
                'description' => 'Evaluation Report - 2 for the Bank of AJK, presenting analysis and outcomes of the procurement or bidding evaluation process.',
                'file_path' => 'public/downloads/BAJK HO HRMD 2022 PPRA Ref 3881--evaluation-2.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                
            ],
            [
                'title' => 'Evaluation Report- 1, Bank of AJK',
                'description' => 'Evaluation Report - 1 for the Bank of AJK, detailing the initial assessment and results of the procurement or tender evaluation process.',
                'file_path' => 'public/downloads/BAJK HO HRMD 2022 PPRA 3881-evaluation-1.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                
            ],
            [
                'title' => 'Addendum to Request for Proposal - Invitation to Bid for Core Banking Solution',
                'description' => 'Addendum to the Request for Proposal: Invitation to Bid for Core Banking Solution, providing updates or clarifications to the original bidding document.',
                'file_path' => 'public/downloads/CoreBanking.jpeg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                
            ],
            [
                'title' => 'Invitation to Bid for Core Banking Solution, Bank of AJK - 19-05-2022',
                'description' => 'Invitation to bid for the implementation of a Core Banking Solution at Bank of AJK, announced on May 19th, 2022.',
                'file_path' => 'public/downloads/CBS Advertisement.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-05-19 10:00:00'),
                'updated_at' => Carbon::parse('2022-05-19 10:00:00'),
            ],
            [
                'title' => 'Invitation to Bids, Bank of AJK - 13-04-2022',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on April 13th, 2022.',
                'file_path' => 'public/downloads/13-04-2022bids.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-04-13 10:00:00'),
                 'updated_at' => Carbon::parse('2022-04-13 10:00:00'),
            ],
            [
                'title' => 'Invitation to Bids, Bank of AJK - 31-03-2022',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on March 31st, 2022.',
                'file_path' => 'public/downloads/bajk-ho-hrmd 31-03-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-03-31 10:00:00'),
                'updated_at' => Carbon::parse('2022-03-31 10:00:00'),
            ],
            [
                'title' => 'Invitation to Bids, Bank of AJK - 04-03-2022',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on March 4th, 2022.',
                'file_path' => 'public/downloads/4-3-2022bids.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                'created_at' => Carbon::parse('2022-03-04 10:00:00'),
                'updated_at' => Carbon::parse('2022-03-04 10:00:00'),
            ],
            [
                'title' => 'Invitation to Bids, Bank of AJK - 04-03-2022',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on March 4th, 2022.',
                'file_path' => 'public/downloads/bajk-ho-hrmd-est-2022-271.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2022-03-04 10:00:00'),
                 'updated_at' => Carbon::parse('2022-03-04 10:00:00'),
            ],
            [
                'title' => 'Corrigendum, Bank of AJK, 24-02-2022',
                'description' => 'Corrigendum notice for previously issued tender(s) by Bank of AJK, published on February 24th, 2022.',
                'file_path' => 'public/downloads/Corrigendum 24-2-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2022-02-24 10:00:00'),
                 'updated_at' => Carbon::parse('2022-02-24 10:00:00'),
            ],
            [
                'title' => 'Cancelation of Bids, Bank of AJK - 14-02-2022',
                'description' => 'Cancellation notice for previously invited bids by Bank of AJK, issued on February 14th, 2022 -182',
                'file_path' => 'public/downloads/cancilationofbids 14 feb 2022-182.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2022-02-14 10:00:00'),
                 'updated_at' => Carbon::parse('2022-02-14 10:00:00'),
            ],
              [
                'title' => 'Cancelation of Bids, Bank of AJK - 14-02-2022',
                'description' =>' Cancellation notice for previously invited bids by Bank of AJK, issued on February 14th, 2022 -181',
                'file_path' => 'public/downloads/cancilationotender 14 feb 2022-181.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2022-02-14 10:00:00'),
                 'updated_at' => Carbon::parse('2022-02-14 10:00:00'),
            ],
              [
                'title' => 'Tender for Services, Bank of AJK - 09-02-2022',
                'description' => 'Tender for provision of services at Bank of AJK, announced on February 9th, 2022.',
                'file_path' => 'public/downloads/9-02-2022-161tender.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2022-02-09 10:00:00'),
                 'updated_at' => Carbon::parse('2022-02-09 10:00:00'),
            ],
              [
                'title' => 'CORRIGENDUM, Bank of AJK - 17-01-2022',
                'description' => 'Corrigendum notice for previously published tender(s) by Bank of AJK, issued on January 17th, 2022.',
                'file_path' => 'public/downloads/jan-17-2022-54-corrigendum.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2022-01-17 10:00:00'),
                 'updated_at' => Carbon::parse('2022-01-17 10:00:00'),
            ],
              [
                'title' => 'Invitation to Bids, Bank of AJK - 10-01-2022',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on January 10th, 2022.',
                'file_path' => 'public/downloads/10-1-2022-38.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2022-01-10 10:00:00'),
                'updated_at' => Carbon::parse('2022-01-10 10:00:00'),
            ],
              [
                'title' => 'Evaluation Report - 04-01-2022',
                'description' => 'Evaluation Report detailing the assessment results of a procurement or tender process, published on January 4th, 2022.',
                'file_path' => 'public/downloads/bajk 4-1-2022.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2022-01-04 10:00:00'),
                 'updated_at' => Carbon::parse('2022-01-04 10:00:00'),
            ],
              [
                'title' => 'Invitation to Bids, Bank of AJK - 29-12-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on December 29th, 2021.',
                'file_path' => 'public/downloads/bids 29-12-2021.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2021-12-29 10:00:00'),
                'updated_at' => Carbon::parse('2021-12-29 10:00:00'),
            ],
              [
                'title' => 'Invitation to Bids, Bank of AJK - 21-12-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on December 21st, 2021.',
                'file_path' => 'public/downloads/bajk-21-12-2021.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2021-12-21 10:00:00'),
                 'updated_at' => Carbon::parse('2021-12-21 10:00:00'),
            ],
            [
                'title' => 'Invitation to Bids, Bank of AJK - 16-12-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on December 16th, 2021.',
                'file_path' => 'public/downloads/16-12-2021-17011.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2021-12-16 10:00:00'),
                'updated_at' => Carbon::parse('2021-12-16 10:00:00'),
            ],

[
                'title' => 'Invitation to Bid for Core Banking Solution, Bank of AJK - 12-11-2021',
                'description' => 'Invitation to bid for the implementation of a Core Banking Solution at Bank of AJK, announced on November 12th, 2021.',
                'file_path' => 'public/downloads/invitation-to-bid-cba-solution 12-11-2021.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2021-11-12 10:00:00'),
               'updated_at' => Carbon::parse('2021-11-12 10:00:00'),
            ],

[
                'title' => 'Invitation to Bids, Bank of AJK - 11-11-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on November 11th, 2021.',
                'file_path' => 'public/downloads/11-11-2021.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2021-11-11 10:00:00'),
                 'updated_at' => Carbon::parse('2021-11-11 10:00:00'),
            ],

[
                'title' => 'Invitation to Bids, Bank of AJK - 12-10-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on October 12th, 2021.',
                'file_path' => 'public/downloads/bajk 12-10-2021.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2021-12-10 10:00:00'),
                'updated_at' => Carbon::parse('2021-12-10 10:00:00'),
            ],

[
                'title' => 'Tender for Services - 29-09-2021 | Corrigendum',
                'description' => 'Tender for provision of services announced on September 29th, 2021, with a corrigendum issued for updates or modifications.',
                'file_path' => 'public/downloads/add-29-09-2021-corrigendum.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2021-09-29 10:00:00'),
                 'updated_at' => Carbon::parse('2021-09-29 10:00:00'),
            ],

[
                'title' => 'Invitation to Bids Bank of AJK - 07-10-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on October 7th, 2021.',
                'file_path' => 'public/downloads/invitation-to-bids-10059.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 'created_at' => Carbon::parse('2021-10-07 10:00:00'),
                  'updated_at' => Carbon::parse('2021-10-07 10:00:00'),
            ],

[
                'title' => 'Corrigendum | Invitation to Bids',
                'description' => 'Corrigendum issued with updates or amendments to the previously published Invitation to Bids.',
                'file_path' => 'public/downloads/corrigendum-add-23-08-21.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
            ],

[
                'title' => 'Invitation to Bids Bank of AJK - 07-09-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on September 7th, 2021.',
                'file_path' => 'public/downloads/invitation-of-bid-09-2021.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-09-07 10:00:00'),
                    'updated_at' => Carbon::parse('2021-09-07 10:00:00'),
                
            ],

[
                'title' => 'Cancellation of Existing Tender for Hiring of Security Services',
                'description' => 'Cancellation notice for the existing tender related to the hiring of security services.',
                'file_path' => 'public/downloads/bajk-ho-hrmd-est-2021-5008.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
            ],

[
                'title' => 'Advertisement for auction of vehicle',
                'description' => 'Advertisement announcing the auction of a vehicle, including terms and conditions for participation.',
                'file_path' => 'public/downloads/advertisement_09_jun_2021.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
            ],

[
                'title' => 'Invitation to BIDS Bank of AJK 03-06-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on June 3rd, 2021.',
                'file_path' => 'public/downloads/invitation-of-bids-03-06-2021.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-06-03 10:00:00'),
                  'updated_at' => Carbon::parse('2021-06-03  10:00:00'),
            ],

[
                'title' => 'Invitation to BIDS Bank of AJK 01-06-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on June 1st, 2021.',
                'file_path' => 'public/downloads/invitation of bids 01-06-2021.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-06-01 10:00:00'),
                  'updated_at' => Carbon::parse('2021-06-01 10:00:00'),
            ],
            
[
                'title' => 'Invitation to BIDS Bank of AJK 25-05-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on May 25th, 2021.',
                'file_path' => 'public/downloads/invitation-of-bids-25-05-2021.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-05-25 10:00:00'),
                  'updated_at' => Carbon::parse('2021-05-25 10:00:00'),
            ],

[
                'title' => 'Invitation to BIDS Bank of AJK 20-05-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on May 20th, 2021.',
                'file_path' => 'public/downloads/invitation-of-bids-25-05-2021 (1).jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-05-20 10:00:00'),
                 'updated_at' => Carbon::parse('2021-05-20 10:00:00'),
            ],

[
                'title' => 'Invitation to BIDS Bank of AJK 07-04-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on April 7th, 2021.',
                'file_path' => 'public/downloads/advertisement-770.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-04-07 10:00:00'),
                     'updated_at' => Carbon::parse('2021-04-07 10:00:00'),
            ],

[
                'title' => 'Invitation to BIDS Bank of AJK 01-04-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on April 1st, 2021.',
                'file_path' => 'public/downloads/advertisement-651.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                   'created_at' => Carbon::parse('2021-04-01 10:00:00'),
                   'updated_at' => Carbon::parse('2021-04-01 10:00:00'),
            ],

[
                'title' => 'Invitation to BIDS Bank of AJK 29-03-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on March 29th, 2021.',
                'file_path' => 'public/downloads/advertisement-636.jpg',
                'file_type' => 'application/pic ',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-03-29 10:00:00'),
                 'updated_at' => Carbon::parse('2021-03-29 10:00:00'),
            ],

[
                'title' => 'Evalutation Report-25-02-2021',
                'description' => 'Evaluation Report presenting the assessment results of a procurement or tender process, published on February 25th, 2021.',
                'file_path' => 'public/downloads/evalutation_report-600.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-02-25 10:00:00'),
                  'updated_at' => Carbon::parse('2021-02-25 10:00:00'),
            ],

[
                'title' => 'Invitation to BIDS Bank of AJK 22-03-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on March 22nd, 2021.',
                'file_path' => 'public/downloads/advertisement_599.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-03-22 10:00:00'),
                  'updated_at' => Carbon::parse('2021-03-22  10:00:00'),
            ],
            [
                'title' => 'Invitation to BIDS Bank of AJK 17-03-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on March 17th, 2021.',
                'file_path' => 'public/downloads/advertisement264.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-03-17 10:00:00'),
                'updated_at' => Carbon::parse('2021-03-17 10:00:00'),
            ],
            [
                'title' => 'Invitation to BIDS Bank of AJK 25-02-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on February 25th, 2021.',
                'file_path' => 'public/downloads/advertisement-395.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-02-25 10:00:00'),
                 'updated_at' => Carbon::parse('2021-02-25 10:00:00'),
            ],
            [
                'title' => 'Corrigendum 31-01-2021| Bank of AJK',
                'description' => 'Corrigendum notice issued by Bank of AJK on January 31st, 2021, providing updates or amendments to a previously published tender.',
                'file_path' => 'public/downloads/corrigendum_it_ hardware.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-01-31 10:00:00'),
                 'updated_at' => Carbon::parse('2021-01-31 10:00:00'),
            ],
            [
                'title' => 'Invitation to BIDS Bank of AJK 17-02-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on February 17th, 2021.',
                'file_path' => 'public/downloads/advertisement_330.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-02-17 10:00:00'),
                  'updated_at' => Carbon::parse('2021-02-17 10:00:00'),
            ],
            [
                'title' => 'Invitation to BIDS Bank of AJK 15-02-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on February 15th, 2021.',
                'file_path' => 'public/downloads/advertisement_329.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-02-15 10:00:00'),
                'updated_at' => Carbon::parse('2021-02-15 10:00:00'),
            ],
            [
                'title' => 'Invitation to BIDS Bank of AJK 20-01-2021',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on January 20th, 2021.',
                'file_path' => 'public/downloads/add_jan_2021.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2021-01-20 10:00:00'),
                  'updated_at' => Carbon::parse('2021-01-20 10:00:00'),
            ],
            [
                'title' => 'Invitation to BIDS Bank of AJK 11-12-2020',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on December 11th, 2020.',
                'file_path' => 'public/downloads/invitation_of_bids_11_12_2020.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2020-12-11 10:00:00'),
                  'updated_at' => Carbon::parse('2020-12-1 10:00:00'),
            ],
              [
                'title' => 'PRE-QUALIFICATION NOTICE FOR LIFE AND GENERAL INSURANCE COMPANIES Bank of AJK 21-10-2020 | Evaluation Report',
                'description' => 'Pre-qualification notice for life and general insurance companies by Bank of AJK, along with the corresponding evaluation report, published on October 21st, 2020.',
                'file_path' => 'public/downloads/Pre-Qualification Notice for life and General Insurance Companies.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,

            ],
 [
                'title' => 'Invitation to BIDS Bank of AJK 19-10-2020 | Corrigendum',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on October 19th, 2020, with a corrigendum issued for updates or amendments.',
                'file_path' => 'public/downloads/c1.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2020-10-19 10:00:00'),
                  'updated_at' => Carbon::parse('2020-10-19  10:00:00'),
            ],



 [
                'title' => 'Invitation to BIDS Bank of AJK 18-09-2020',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on September 18th, 2020.',
                'file_path' => 'public/downloads/web.png',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2020-09-18 10:00:00'),
               'updated_at' => Carbon::parse('2020-09-18  10:00:00'),
            ],

 [
                'title' => 'Invitation to BIDS Bank of AJK 02-09-2020',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on September 2nd, 2020.',
                'file_path' => 'public/downloads/2sepscan0001.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2020-09-02 10:00:00'),
                'updated_at' => Carbon::parse('2020-09-02 10:00:00'),
            ],
 [
                'title' => 'Publication of Advertisement of Bank of AJK 26-08-2020',
                'description' => 'Publication of advertisement by Bank of AJK, released on August 26th, 2020.',
                'file_path' => 'public/downloads/advertisement (1).pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2020-08-26 10:00:00'),
                    'updated_at' => Carbon::parse('2020-08-26 10:00:00'),
            ],
 [
                'title' => 'Publication of Advertisement of Bank of AJK 06-08-2020',
                'description' => 'Publication of advertisement by Bank of AJK, released on August 6th, 2020.',
                'file_path' => 'public/downloads/New Doc 08-06-2020 17.32.03.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2020-08-06 10:00:00'),
                'updated_at' => Carbon::parse('2020-08-06 10:00:00'),
            ],
 [
                'title' => 'Publication of Advertisement of Bank of AJK 06-08-2020',
                'description' => 'Publication of advertisement by Bank of AJK, announced on August 6th, 2020.',
                'file_path' => 'public/downloads/New Doc 08-06-2020 17.32.03 (1).pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2020-08-06 10:00:00'),
                 'updated_at' => Carbon::parse('2020-08-06 10:00:00'),
            ],

 [
                'title' => 'Invitation to BIDS Bank of AJK 27-03-2020',
                'description' => 'Invitation to submit sealed bids for procurement opportunities at Bank of AJK, announced on March 27th, 2020.',
                'file_path' => 'public/downloads/27-3-2020.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2020-03-27 10:00:00'),
                  'updated_at' => Carbon::parse('2020-03-27 10:00:00'),
            ],



 [
                'title' => 'Single Stage - One Envelop Bidding Process Bank of AJK 03-02-2020',
                'description' => 'Single Stage – One Envelope bidding process for procurement at Bank of AJK, announced on February 3rd, 2020.',
                'file_path' => 'public/downloads/pic3.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2020-02-03 10:00:00'),
                  'updated_at' => Carbon::parse('2020-02-03 10:00:00'),
            ],



 [
                'title' => 'Auction of Vehicles - Bank of AJK 23-12-2019',
                'description' => 'Announcement for the auction of vehicles by Bank of AJK, published on December 23rd, 2019.',
                'file_path' => 'public/downloads/IMG_20191223_102508.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2019-12-23 10:00:00'),
                 'updated_at' => Carbon::parse('2019-12-23 10:00:00'),
            ],
 [
                'title' => 'Publication of Advertisement of Bank of AJK 11-10-2019',
                'description' => 'Advertisement published by Bank of AJK on 11-10-2019 inviting bids or announcing official opportunities.',
                'file_path' => 'public/downloads/11-10-2019.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2019-10-11 10:00:00'),
                 'updated_at' => Carbon::parse('2019-10-11 10:00:00'),
            ],



 [
                'title' => 'Evalutioan Report (Renovation Work Islamgarh Branch Mirpur)',
                'description' => 'Evaluation Report for Renovation Work at Islamgarh Branch, Mirpur – detailing the assessment of bids and selection process for renovation contractors.',
                'file_path' => 'public/downloads/islamgarh.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  
            ],
 [
                'title' => 'Schedule of Charges',
                'description' => 'Document outlining the fees and charges for various banking services.',
                'file_path' => 'public/downloads/soc_jul_2019.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  
            ],
 [
                'title' => 'Publication of Advertisement of Bank of AJK 02-09-2019',
                'description' => 'Advertisement published by Bank of AJK on 02-09-2019 for public notice or tender invitation.',
                'file_path' => 'public/downloads/laptop.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2019-09-02 10:00:00'),
                 'updated_at' => Carbon::parse('2019-09-02  10:00:00'),
            ],



 [
                'title' => 'Publication of Advertisement of Bank of AJK 27-08-2019',
                'description' => 'Advertisement published by Bank of AJK on 27-08-2019 announcing tenders or public notifications.',
                'file_path' => 'public/downloads/27-8-2019.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2019-08-27 10:00:00'),
                   'updated_at' => Carbon::parse('019-08-27 10:00:00'),
            ],

 [
                'title' => 'Evalutioan Report',
                'description' => 'Official document summarizing the assessment and comparison of bids or proposals received.',
                'file_path' => 'public/downloads/evalutiaonreport.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
            ],
 [
                'title' => 'Hiring of Consultant for System Evaluation & vendor Selection- Core Banking System',
                'description' => 'Advertisement for hiring a consultant to evaluate systems and assist in vendor selection for the Core Banking System.',
                'file_path' => 'public/downloads/revised_ advertisement_annex_b.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                 
            ],
            [
                'title' => 'Invitation to BIDS for purchase of Furniture & Fixture as on 06-Apr-2019',
                'description' => 'Invitation to bids issued on 06-Apr-2019 for the purchase of furniture and fixtures.',
                'file_path' => 'public/downloads/add_as_on_05-apr-2019.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,

                'created_at' => Carbon::parse('2019-04-06 10:00:00'),
                 'updated_at' => Carbon::parse('2019-04-06 10:00:00'),
            ],
            [
                'title' => '(Retender) Invitation to BIDS as on 27-Mar-2019 | Brarkot Branch',
                'description' => 'Retender invitation to bids issued on 27-Mar-2019 for Brarkot Branch.',
                'file_path' => 'public/downloads/add_27_mar_2019_brarkot_branch.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2019-03-27 10:00:00'),
                 'updated_at' => Carbon::parse('2019-03-27 10:00:00'),
            ],
            [
                'title' => '(Retender) Invitation to BIDS as on 27-Mar-2019 | Chatter Kalas Branch',
                'description' => 'Retender invitation to bids issued on 27-Mar-2019 for Chatter Kalas Branch.',
                'file_path' => 'public/downloads/add_27_mar_2019_chatter_klass_branch.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2019-03-27 10:00:00'),
                 'updated_at' => Carbon::parse('2019-03-27 10:00:00'),
            ],
            [
                'title' => 'Invitation to BIDS as on 25-Mar-2019',
                'description' => 'Invitation to bids issued on 25-Mar-2019 for procurement or project-related services.',
                'file_path' => 'public/downloads/add_held_on_25_03_2019.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2019-03-25 10:00:00'),
                   'updated_at' => Carbon::parse('2019-03-25 10:00:00'),
            ],
            [
                'title' => 'Invitation to BIDS as on 21-Mar-2019',
                'description' => 'Invitation to bids issued on 21-Mar-2019 for procurement or service requirements.',
                'file_path' => 'public/downloads/add_held_on_21_03_2019.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2019-03-21 10:00:00'),
                  'updated_at' => Carbon::parse('2019-03-21 10:00:00'),
            ],
            [
                'title' => 'Invitation to BIDS as on 20-Feb-2019',
                'description' => 'Invitation to bids issued on 20-Feb-2019 for procurement or project execution.',
                'file_path' => 'public/downloads/invitation_to_bids_20_feb_2019.jpg',
                'file_type' => 'application/pic',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'picture',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2019-02-20 10:00:00'),
                  'updated_at' => Carbon::parse('2019-02-20 10:00:00'),
            ],
            [
                'title' => 'Invitation to BIDS as on 15-Feb-2019',
                'description' => 'Invitation to bids issued on 15-Feb-2019 for procurement or service-related work.',
                'file_path' => 'public/downloads/add-15-Feb-2019.pdf',
                'file_type' => 'application/pdf',
                'file_size' => 1572864, // ~1.5MB
                'category' => 'Document',
                'is_featured' => false,
                'is_active' => true,
                'download_count' => 423,
                  'created_at' => Carbon::parse('2019-02-15 10:00:00'),
                  'updated_at' => Carbon::parse('2019-02-15 10:00:00'),
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
