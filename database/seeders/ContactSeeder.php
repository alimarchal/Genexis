<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $branches = Branch::all();

        $phonePrefix = [
            'Muzaffarabad' => ['05822', '05823'],
            'Mirpur' => ['05827', '05828'],
            'Kotli' => ['05824', '05825'],
            'Poonch' => ['05826', '05829'],
            'Bagh' => ['05821', '05830'],
            'Bhimber' => ['05831', '05832'],
            'Neelum' => ['05833', '05834'],
            'Jhelum Valley' => ['05835', '05836'],
            'Haveli' => ['05837', '05838'],
            'Sudhanoti' => ['05839', '05840'],
            'Hattian Bala' => ['05841', '05842'],
        ];

        foreach ($branches as $index => $branch) {
            $district = $branch->district->name;
            $prefixes = $phonePrefix[$district] ?? ['05822'];

            // Each branch gets phone, mobile, and email
            $branchCode = str_pad($index + 1, 3, '0', STR_PAD_LEFT);

            // Phone number
            Contact::create([
                'branch_id' => $branch->id,
                'contact' => $prefixes[0].'-'.rand(100000, 999999),
                'type' => 'telephone_no',
                'status' => 'active',
            ]);

            // Mobile number
            Contact::create([
                'branch_id' => $branch->id,
                'contact' => '030'.rand(0, 9).'-'.rand(1000000, 9999999),
                'type' => 'mobile_no',
                'status' => 'active',
            ]);

            // Email
            $branchName = strtolower(str_replace(' ', '', $branch->name));
            $branchName = preg_replace('/[^a-z0-9]/', '', $branchName);
            Contact::create([
                'branch_id' => $branch->id,
                'contact' => $branchName.'@genexis.com.pk',
                'type' => 'email',
                'status' => 'active',
            ]);

            // Add fax for main branches
            if ($branch->type === 'main_branch') {
                Contact::create([
                    'branch_id' => $branch->id,
                    'contact' => $prefixes[0].'-'.rand(100000, 999999),
                    'type' => 'fax',
                    'status' => 'active',
                ]);
            }
        }
    }
}
