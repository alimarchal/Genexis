<?php

namespace Database\Seeders;

use App\Models\Career;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder
{
    public function run(): void
    {
        // Create specific career opportunities
        $careers = [
            [
                'title' => 'Senior Software Engineer',
                'description' => 'We are looking for an experienced Senior Software Engineer to join our technology team. You will be responsible for developing and maintaining our core banking applications using modern technologies.',
                'requirements' => 'Bachelor\'s degree in Computer Science or related field. 5+ years of experience in software development. Proficiency in PHP, Laravel, JavaScript, and database management.',
                'location' => 'Dhaka',
                'document' => 'careers/senior-software-engineer.pdf',
                'closing_date' => '2025-07-15',
                'benefits' => 'Competitive salary, health insurance, provident fund, annual bonus, and professional development opportunities.',
                'is_featured' => true,
                'is_active' => true,
                'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'Branch Manager',
                'description' => 'Join our team as a Branch Manager and lead our branch operations. You will be responsible for managing daily operations, customer service, and team leadership.',
                'requirements' => 'MBA in Finance or Banking. 7+ years of banking experience with at least 3 years in management role. Strong leadership and communication skills.',
                'location' => 'Chittagong',
                'document' => 'careers/branch-manager.pdf',
                'closing_date' => '2025-08-01',
                'benefits' => 'Attractive salary package, medical benefits, car allowance, and performance-based incentives.',
                'is_featured' => true,
                'is_active' => true,
                'views_count' => 142,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'Customer Service Representative',
                'description' => 'We are seeking a dedicated Customer Service Representative to provide excellent service to our valued customers and handle their banking needs.',
                'requirements' => 'Bachelor\'s degree in any discipline. 1-2 years of customer service experience. Excellent communication skills in English and Urdu.',
                'location' => 'Sylhet',
                'document' => null,
                'closing_date' => '2025-07-30',
                'benefits' => 'Competitive salary, health insurance, training opportunities, and career growth prospects.',
                'is_featured' => false,
                'is_active' => true,
                'views_count' => 67,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'IT Support Specialist',
                'description' => 'Join our IT team as a Support Specialist. You will be responsible for maintaining IT infrastructure and providing technical support to all departments.',
                'requirements' => 'Bachelor\'s degree in IT/Computer Science. 2+ years of IT support experience. Knowledge of networking, hardware troubleshooting, and system administration.',
                'location' => 'Rajshahi',
                'document' => 'careers/it-support-specialist.pdf',
                'closing_date' => '2025-08-15',
                'benefits' => 'Good salary package, medical coverage, technical training, and certification opportunities.',
                'is_featured' => false,
                'is_active' => true,
                'views_count' => 34,
                'created_by' => 1,
                'updated_by' => 1,
            ],
        ];

        foreach ($careers as $career) {
            Career::create($career);
        }

        // Create additional random careers
        Career::factory(15)->create();
    }
}
