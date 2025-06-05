<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contacts = [
            ['branch_id' => 1, 'phone' => '05288-921254'],
            ['branch_id' => 1, 'phone' => '05822-921181'],
            ['branch_id' => 2, 'phone' => '05827-921448'],
            ['branch_id' => 3, 'phone' => '05827-923070'],
            ['branch_id' => 4, 'phone' => '05827-922664'],
            ['branch_id' => 5, 'phone' => '05826-920241'],
            ['branch_id' => 6, 'phone' => '05824-920069'],
            ['branch_id' => 7, 'phone' => '05826-923062'],
            ['branch_id' => 8, 'phone' => '05821-920033'],
            ['branch_id' => 9, 'phone' => '05827-922562'],
            ['branch_id' => 10, 'phone' => '05823-920103'],
            ['branch_id' => 11, 'phone' => '05823-921005'],
            ['branch_id' => 12, 'phone' => '05828-920505'],
            ['branch_id' => 13, 'phone' => '05825-920010'],
            ['branch_id' => 14, 'phone' => '05826-921060'],
            ['branch_id' => 15, 'phone' => '05827-920439'],
            ['branch_id' => 16, 'phone' => '05824-920233'],
            ['branch_id' => 17, 'phone' => '05822-922502'],
            ['branch_id' => 18, 'phone' => '05822-920466'],
            ['branch_id' => 19, 'phone' => '05822-922302'],
            ['branch_id' => 20, 'phone' => '05826-475094'],
            ['branch_id' => 21, 'phone' => '05826-921863'],
            ['branch_id' => 22, 'phone' => '05822-922003'],
            ['branch_id' => 23, 'phone' => '05823-921213'],
            ['branch_id' => 24, 'phone' => '05822-922108'],
            ['branch_id' => 25, 'phone' => '05824-921027'],
            ['branch_id' => 26, 'phone' => '05826-921163'],
            ['branch_id' => 27, 'phone' => '05827-922260'],
            ['branch_id' => 28, 'phone' => '05822-923126'],
            ['branch_id' => 29, 'phone' => '05828-922064'],
            ['branch_id' => 30, 'phone' => '05824-920911'],
            ['branch_id' => 31, 'phone' => '05826-922361'],
            ['branch_id' => 32, 'phone' => '05825-920224'],
            ['branch_id' => 33, 'phone' => '05828-922162'],
            ['branch_id' => 34, 'phone' => '05822-922631'],
            ['branch_id' => 35, 'phone' => '05827-485533'],
            ['branch_id' => 36, 'phone' => '05826-922165'],
            ['branch_id' => 37, 'phone' => '05822-921826'],
            ['branch_id' => 38, 'phone' => '05823-921772'],
            ['branch_id' => 39, 'phone' => '05824-921608'],
            ['branch_id' => 40, 'phone' => '05822-920043'],
            ['branch_id' => 41, 'phone' => '05825-920316'],
            ['branch_id' => 42, 'phone' => '05826-921461'],
            ['branch_id' => 43, 'phone' => '05821-920802'],
            ['branch_id' => 44, 'phone' => '05826-921865'],
            ['branch_id' => 45, 'phone' => '05827-922764'],
            ['branch_id' => 46, 'phone' => '05827-920442'],
            ['branch_id' => 47, 'phone' => '05827-922564'],
            ['branch_id' => 48, 'phone' => '05826-921761'],
            ['branch_id' => 49, 'phone' => '05826-471319'],
            ['branch_id' => 50, 'phone' => '05824-921313'],
            ['branch_id' => 51, 'phone' => '05826-474441'],
            ['branch_id' => 52, 'phone' => '05821-920502'],
            ['branch_id' => 53, 'phone' => '05822-923007'],
            ['branch_id' => 54, 'phone' => '05827-920405'],
            ['branch_id' => 55, 'phone' => '05826-923150'],
            ['branch_id' => 56, 'phone' => '05824-920545'],
            ['branch_id' => 57, 'phone' => '05827-922666'],
            ['branch_id' => 58, 'phone' => '05827-923011'],
            ['branch_id' => 59, 'phone' => '05330-29731'],
            ['branch_id' => 60, 'phone' => '05824-921106'],
            ['branch_id' => 61, 'phone' => '05822-920747'],
            ['branch_id' => 62, 'phone' => '05822-922514'],
            ['branch_id' => 63, 'phone' => '05821-920302'],
            ['branch_id' => 64, 'phone' => '05826-923350'],
            ['branch_id' => 65, 'phone' => '05826-480649'],
            ['branch_id' => 66, 'phone' => '05826-920247'],
            ['branch_id' => 67, 'phone' => '05822-923020'],
            ['branch_id' => 68, 'phone' => '05825-920715'],
            ['branch_id' => 69, 'phone' => '05821-920342'],
            ['branch_id' => 70, 'phone' => '0301-3117420'],
            ['branch_id' => 71, 'phone' => '0315-3191313'],
            ['branch_id' => 72, 'phone' => '0345-5939806'],
            ['branch_id' => 73, 'phone' => '05828-922165-66'],
            ['branch_id' => 74, 'phone' => '0346-5463091'],
            ['branch_id' => 75, 'phone' => '05826-922045-46'],
            ['branch_id' => 76, 'phone' => '05826-922045-46'],
            ['branch_id' => 77, 'phone' => '05822-920862'],
            ['branch_id' => 78, 'phone' => '05828-922068'],
            ['branch_id' => 79, 'phone' => '05827-920079'],
            ['branch_id' => 80, 'phone' => '05827-922448'],
            ['branch_id' => 80, 'phone' => '05827-922449'],
            ['branch_id' => 81, 'phone' => '05827-922654'],
            ['branch_id' => 81, 'phone' => '05827-922656'],
            ['branch_id' => 82, 'phone' => '05826-940820'],
            ['branch_id' => 83, 'phone' => '05824-920040'],
            ['branch_id' => 83, 'phone' => '05824-920049'],
            ['branch_id' => 84, 'phone' => '05822-922867'],
            ['branch_id' => 84, 'phone' => '05822-922865'],
            ['branch_id' => 85, 'phone' => '05822-923021'],
            ['branch_id' => 86, 'phone' => '05823-920834'],
            ['branch_id' => 87, 'phone' => '05827-922264'],
        ];

        foreach ($contacts as $contact) {
            $email = 'manager'.str_pad($contact['branch_id'], 4, '0', STR_PAD_LEFT).'@bankajk.com';

            Contact::create([
                'name' => 'NONE',
                'email' => $email,
                'phone' => $contact['phone'],
                'position' => 'NONE',
                'department' => 'NONE',
                'branch_id' => $contact['branch_id'],
                'status' => 'active',
            ]);
        }
    }
}
