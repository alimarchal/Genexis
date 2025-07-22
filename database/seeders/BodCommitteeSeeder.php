<?php

namespace Database\Seeders;

use App\Models\BodCommittee;

use App\Models\BoardOfDirector;
use App\Models\Management;
use Illuminate\Database\Seeder;

class BodCommitteeSeeder extends Seeder
{
    public function run(): void
    {
        // Get members for committees based on actual seeded data
        $chairmanBAJK = BoardOfDirector::where('full_name', 'Abdul Majid Khan')->first();
        $presidentCEO = BoardOfDirector::where('full_name', 'Shahid Shahzad Mir')->first();
        $secretaryFinance = BoardOfDirector::where('full_name', 'Islam Zaib')->first();
        $secretaryLaw = BoardOfDirector::where('full_name', 'Muhammad Sajjad')->first();
        $secretaryIndustries = BoardOfDirector::where('full_name', 'Khalid Mehmood Mirza')->first();
        $mubasharNabi = BoardOfDirector::where('full_name', 'Mubashar Nabi')->first();
        $bushraNaz = BoardOfDirector::where('full_name', 'Bushra Naz Malik')->first();
       $companySecretary = BoardOfDirector::where('full_name', 'Dr. Adnan U. Khan')->first();


        // Get from management
        $presidentCEOManag = Management::where('full_name', 'Shahid Shahzad Mir')->first();
        $hrDivHead = Management::where('full_name', 'Rahila Javed')->first();
        $riskHead = Management::where('full_name', 'Amjad Mahmood Gilani')->first();
        $itHead = Management::where('full_name', 'Gulzar A. Rao')->first();
        $complianceHead = Management::where('full_name', 'Javed Iqbal')->first();
        // $operationsHead = Management::where('full_name', 'Ahtasham Malik')->first();
        $auditHead = Management::where('full_name', 'Tariq Khan')->first();
        $committees = [
            [
                'name' => 'Human Resource Committee of BoD',
                'description' => 'Committee responsible for human resource policies and management oversight.',
                'chairman_board_id' => $secretaryFinance?->id,
                'secretary_management_id' => $hrDivHead?->id,
               'board_members' => array_filter([
    $mubasharNabi?->id,
    $bushraNaz?->id,
]),
                
                'management_members' => array_filter([$presidentCEOManag?->id]),
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Audit Committee of BoD',
                'description' => 'Committee responsible for audit oversight and financial compliance.',
                'chairman_board_id' => $bushraNaz?->id,
                'secretary_management_id' => $auditHead?->id,
                'board_members' => array_filter([
                    $secretaryFinance?->id,
                    $secretaryIndustries?->id,
                     $mubasharNabi?->id,
                   
                ]),
                // 'management_members' => array_filter([$auditHead?->id]),
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Risk Management Committee of BoD',
                'description' => 'Committee responsible for risk assessment and management strategies.',
                'chairman_board_id' => $mubasharNabi?->id,
                'secretary_management_id' => $riskHead?->id,
                'board_members' => array_filter([
                    $secretaryFinance?->id,
                    $secretaryLaw?->id,
                    $bushraNaz?->id,
                ]),
                'management_members' => array_filter([$presidentCEOManag?->id]),
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'I.T Committee of BoD',
                'description' => 'Committee responsible for information technology governance and strategy.',
                'chairman_board_id' => $secretaryFinance?->id,
                'secretary_management_id' => $itHead?->id,
                'board_members' => array_filter([
                    $secretaryLaw?->id,
                    $mubasharNabi?->id,
                ]),
                'management_members' => array_filter([$presidentCEOManag?->id]),
                'is_active' => true,
                'sort_order' => 4,
            ],

            [
    'name' => 'Board Environmental, Social & Governance Committee',
    'description' => 'Committee responsible for overseeing environmental, social, and corporate governance matters.',
    'chairman_board_id' => $secretaryIndustries?->id,
   'secretary_board_id' => $companySecretary?->id,
    'board_members' => array_filter([
        $mubasharNabi?->id,
       $bushraNaz?->id,
    ]),
    'management_members' => [],
    'is_active' => true,
    'sort_order' => 5,
],
        ];

        foreach ($committees as $committee) {
            BodCommittee::create($committee);
        }
    }
}
