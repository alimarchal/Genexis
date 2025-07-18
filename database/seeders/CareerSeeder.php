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
                'title' => 'Date Extension',
                'description' => 'We are looking for an experienced Senior Software Engineer to join our technology team. You will be responsible for developing and maintaining our core banking applications using modern technologies.',
                'requirements' => '',
                'location' => '',
                'document' => 'careers/career1.jpeg',
                'closing_date' => '2025-06-15',
                'benefits' => '',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
            ],
             [
                'title' => 'CAREER OPPORTUNITIES',
                'description' => ' We are looking for dedicated resources having relevant experience and are willing to work in Project
                             Management Office, Information Technology Division of the bank for execution and implementation of Core Banking Solution and Digital
                             Channels project with proven track record and capacity act as a catalyst for transformation in a dynamic and challenging environment in
                             the area of Information Technology. The Individuals who are team players, energetic, dynamic and result oriented and willing to work in
                             a challenging environment with a lot of growth opportunities, fulfilling the below-mentioned basic eligibility criteria may apply for the positions.',
                'requirements' => 'Kindly consult the detailed advertisement for complete eligibility requirements.',
                'location' => 'All over AJK',
                'document' => 'careers/career2.pdf',
                'closing_date' => '2025-04-16',
                'benefits' => '',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
            ],
            [
                'title' => 'Corrigendum',
                'description' => 'This corrigendum notice contains updates or modifications to the original advertisement. Please refer to the attached document for detailed information.',
                'requirements' => 'Refer to the corrigendum document for revised criteria or changes.',
                 'location' => 'Muzaffarabad, AJ&K',
                'document' => 'careers/career3.pdf',
                'closing_date' => '2025-06-15',
                'benefits' => '',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
            ],
             [
                 'title' => 'Corrigendum – Date Extension',
                 'description' => 'The Bank of Azad Jammu and Kashmir has issued a corrigendum regarding the previously advertised Internship Opportunities 2024 (Ref: AJK 123-D/02/2024) published on February 15, 2024 in Daily Dawn and Daily Jang. The deadline for submission of online applications has been extended up to March 10, 2024. All other terms and conditions remain unchanged.',
                 'requirements' => 'All eligibility criteria and requirements remain the same as stated in the original advertisement. Please refer to the original notice for details.',
                'location' => 'Bank of Azad Jammu and Kashmir, Head Office, Sardar Nazir Plaza, Muzaffarabad',
                'document' => 'careers/career4.pdf',
                'closing_date' => '2025-06-15',
                'benefits' => '',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
            ],
             [
                 'title' => 'Internship Opportunities 2024 ',
                 'description' => 'The Bank of Azad Jammu and Kashmir (BAJK) is offering a one-year paid internship program for graduate and postgraduate students. The internship provides hands-on work experience in various functional areas across different branches.',
                 'requirements' => 'Kindly consult the detailed advertisement for complete eligibility requirements.',
                'location' => 'All over AJK',
                'document' => 'careers/career5.pdf',
                'closing_date' => '2024-03-10',
                'benefits' => 'Competitive stipend, and professional development opportunities.',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
            ],
                  [
                    'title' => 'CAREER OPPORTUNITIES',
                 'description' => 'The Bank of Azad Jammu and Kashmir (BAJK) is an emerging and rapidly growing Financial Institution wholly owned by the Azad Government of the State of Azad Jammu and Kashmir. The BAJK focuses on strengthening its institutionalcapacity through continugus upgradation in terms of Human Resource at the Bank. Currently, BAJK is going to hire a batch of General Banking Officers (GBOs) in Grade-IV to meet the shortfall of staff at branches at Mirpur, Kotli & Rawalakot Regions through competitive test to be conducted by third party testing firm. For the purpose, BAJK is looking for services of young individuals who are team players, energetic, result oriented and willing to work in a challenging environment with a lot of growth opportunities. ',
                 'requirements' => 'Kindly consult the detailed advertisement for complete eligibility requirements.',
                'location' => 'Mirpur, Rawalakot,Kotli Regions',
                'document' => 'careers/career6.pdf',
                'closing_date' => '2024-03-02',
                'benefits' => 'Competitive salary, health insurance, provident fund, annual bonus, and professional development opportunities.',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
                 ],
                   [
                    'title' => 'Corrigendum  ',
                 'description' => 'Corrigendum notice from Bank of Azad Jammu and Kashmir updating the number of positions for Assistant/Cash Sorter roles across branches, with regional quotas and disability reservations.',
                 'requirements' => 'Kindly consult the detailed advertisement for complete eligibility requirements.',
                'location' => 'All over AJK',
                'document' => 'careers/career7.jpeg',
                'closing_date' => '2024-02-15',
                'benefits' => '',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
                 ],
                   [

                'title' => 'Assistant / Cash Sorter Positions',
                'description' => 'Contract-based opportunities at Bank of Azad Jammu and Kashmir for young, energetic individuals seeking career growth in banking operations.',
                'requirements' => 'Intermediate minimum (graduation preferred), age 18-42, computer literacy, communication skills. AJK State Subjects preferred.',
                 'location' => 'Various branches across Muzaffarabad, Rawalakot, Mirpur, and Kotli regions',
                'document' => 'careers/career8.pdf',
                'closing_date' => '204-02-3',
                 'benefits' => '2-year contract with potential absorption into regular cadre, competitive compensation package per bank policy',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
                 ],
                   [
                'title' => 'Enployement Form ',
                 'description' => 'Standard employment application form for all career opportunities at Bank of Azad Jammu & Kashmir. This universal document collects essential candidate information required for consideration across various positions, roles, and departments within the banking institution.',
                 'requirements' => '',
                'location' => '',
                'document' => 'careers/career9.pdf',
                'closing_date' => '2025-06-15',
                'benefits' => '',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
                 ],

  [
                'title' => 'DATE EXTENSION (Advertisement No. AJK-102D/03/2025)',
                'description' => 'This notice refers to a job advertisement published on March 15, 2025, in Daily Dawn and Daily Jang Islamabad, with the deadline for submitting online applications further extended up to July 15, 2025, while all other terms and conditions remain the same.',
                'requirements' => '',
                'location' => '',
                'document' => 'careers/career10.jpeg',
                'closing_date' => '2025-07-15',
                'benefits' => '',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
            ],

               [
                'title' => 'DATE EXTENSION (Advertisement No. AJK-136-D/05/2025)',
                'description' => 'This notice, regarding a job advertisement published on March 15, 2025, in Daily Dawn and Daily Jang Islamabad, states that the deadline for submitting online applications has been further extended to July 15, 2025, with all other terms and conditions remaining the same.',
                'requirements' => '',
                'location' => '',
                'document' => 'careers/career11.jpeg',
                'closing_date' => '2025-07-15',
                'benefits' => '',
                'is_featured' => true,
                'is_active' => true,
                // 'views_count' => 85,
                'created_by' => 1,
                'updated_by' => 1,
            ],




            // [
            //     'title' => 'Senior Software Engineer',
            //     'description' => 'We are looking for an experienced Senior Software Engineer to join our technology team. You will be responsible for developing and maintaining our core banking applications using modern technologies.',
            //     'requirements' => 'Bachelor\'s degree in Computer Science or related field. 5+ years of experience in software development. Proficiency in PHP, Laravel, JavaScript, and database management.',
            //     'location' => 'Dhaka',
            //     'document' => 'careers/senior-software-engineer.pdf',
            //     'closing_date' => '2025-07-15',
            //     'benefits' => 'Competitive salary, health insurance, provident fund, annual bonus, and professional development opportunities.',
            //     'is_featured' => true,
            //     'is_active' => true,
            //     'views_count' => 85,
            //     'created_by' => 1,
            //     'updated_by' => 1,
            // ],
            // [
            //     'title' => 'Branch Manager',
            //     'description' => 'Join our team as a Branch Manager and lead our branch operations. You will be responsible for managing daily operations, customer service, and team leadership.',
            //     'requirements' => 'MBA in Finance or Banking. 7+ years of banking experience with at least 3 years in management role. Strong leadership and communication skills.',
            //     'location' => 'Chittagong',
            //     'document' => 'careers/branch-manager.pdf',
            //     'closing_date' => '2025-08-01',
            //     'benefits' => 'Attractive salary package, medical benefits, car allowance, and performance-based incentives.',
            //     'is_featured' => true,
            //     'is_active' => true,
            //     'views_count' => 142,
            //     'created_by' => 1,
            //     'updated_by' => 1,
            // ],
            // [
            //     'title' => 'Customer Service Representative',
            //     'description' => 'We are seeking a dedicated Customer Service Representative to provide excellent service to our valued customers and handle their banking needs.',
            //     'requirements' => 'Bachelor\'s degree in any discipline. 1-2 years of customer service experience. Excellent communication skills in English and Urdu.',
            //     'location' => 'Sylhet',
            //     'document' => null,
            //     'closing_date' => '2025-07-30',
            //     'benefits' => 'Competitive salary, health insurance, training opportunities, and career growth prospects.',
            //     'is_featured' => false,
            //     'is_active' => true,
            //     'views_count' => 67,
            //     'created_by' => 1,
            //     'updated_by' => 1,
            // ],
            // [
            //     'title' => 'IT Support Specialist',
            //     'description' => 'Join our IT team as a Support Specialist. You will be responsible for maintaining IT infrastructure and providing technical support to all departments.',
            //     'requirements' => 'Bachelor\'s degree in IT/Computer Science. 2+ years of IT support experience. Knowledge of networking, hardware troubleshooting, and system administration.',
            //     'location' => 'Rajshahi',
            //     'document' => 'careers/it-support-specialist.pdf',
            //     'closing_date' => '2025-08-15',
            //     'benefits' => 'Good salary package, medical coverage, technical training, and certification opportunities.',
            //     'is_featured' => false,
            //     'is_active' => true,
            //     'views_count' => 34,
            //     'created_by' => 1,
            //     'updated_by' => 1,
            // ],
        ];

        foreach ($careers as $career) {
            Career::create($career);
        }

        // Create additional random careers
        // Career::factory(15)->create();
    }
}