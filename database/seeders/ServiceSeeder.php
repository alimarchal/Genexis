<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\ServiceAttribute;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run()
    {
        // Lockers Facility
        $lockersService = Service::create([
            'name' => 'Lockers Facility',
            'slug' => 'lockers-facility',
            'description' => "Lockers' facility is available in Main Branch Muzaffarabad, Main Branch Mirpur, Ladies Branch Mirpur, and CMH Road Branch Rawalakot in three different sizes Small, Medium and Large on annually fee with one time Security Deposit respectively to the size of locker. Locker holders need to have an account in the Bank.",
            'icon' => '🔒',
            'image' => 'https://demo.bankajk.com/wp-content/uploads/2023/10/locker.jpg',
            'sort_order' => 1,
        ]);

        $lockersAttributes = [
            ['attribute_name' => 'Availability', 'attribute_value' => 'Main Branch Muzaffarabad, Main Branch Mirpur, Ladies Branch Mirpur, CMH Road Branch Rawalakot', 'sort_order' => 1],
            ['attribute_name' => 'Sizes Available', 'attribute_value' => 'Small, Medium, Large', 'sort_order' => 2],
            ['attribute_name' => 'Payment Structure', 'attribute_value' => 'Annual fee + One time Security Deposit', 'sort_order' => 3],
            ['attribute_name' => 'Eligibility', 'attribute_value' => 'Must have account with the Bank', 'sort_order' => 4],
            ['attribute_name' => 'Security Features', 'attribute_value' => '24/7 surveillance, Fire protection, Dual key system', 'sort_order' => 5],
            ['attribute_name' => 'Annual Charges', 'attribute_value' => "Small: Rs. 2,000\nMedium: Rs. 3,500\nLarge: Rs. 5,000", 'sort_order' => 6],
            ['attribute_name' => 'Required Documents', 'attribute_value' => 'CNIC copy, Account statement, Passport photographs', 'sort_order' => 7],
        ];

        foreach ($lockersAttributes as $attr) {
            ServiceAttribute::create(array_merge($attr, ['service_id' => $lockersService->id]));
        }

        // Utility Bills Collection
        $utilityService = Service::create([
            'name' => 'Utility Bills Collection',
            'slug' => 'utility-bills-collection',
            'description' => "Our bank's extensive network of branches is fully authorized to provide the convenient service of collecting electricity bills for our customers. You can easily pay your electricity bills at any of our bank branches, making it a hassle-free experience for your bill payment needs.",
            'icon' => '💡',
            'image' => 'https://demo.bankajk.com/wp-content/uploads/2023/10/utility-bill.png',
            'sort_order' => 2,
        ]);

        $utilityAttributes = [
            ['attribute_name' => 'Service Coverage', 'attribute_value' => 'All bank branches authorized for electricity bill collection', 'sort_order' => 1],
            ['attribute_name' => 'Bill Types', 'attribute_value' => 'Electricity bills, Gas bills, Water bills', 'sort_order' => 2],
            ['attribute_name' => 'Customer Benefits', 'attribute_value' => 'Hassle-free experience, Convenient locations', 'sort_order' => 3],
            ['attribute_name' => 'Service Hours', 'attribute_value' => 'Monday to Saturday: 9:00 AM to 5:00 PM', 'sort_order' => 4],
            ['attribute_name' => 'Service Charges', 'attribute_value' => 'Rs. 50 per transaction', 'sort_order' => 5],
            ['attribute_name' => 'Payment Methods', 'attribute_value' => 'Cash, Account debit, Mobile banking', 'sort_order' => 6],
        ];

        foreach ($utilityAttributes as $attr) {
            ServiceAttribute::create(array_merge($attr, ['service_id' => $utilityService->id]));
        }

        // Services for AJK PSC
        $pscService = Service::create([
            'name' => 'Services for AJK PSC',
            'slug' => 'services-for-ajk-psc',
            'description' => 'At all our branches, we proudly offer the service of collecting the application fees for the AJK Public Service Commission from candidates. In addition to this, we also provide application forms, ensuring a seamless and efficient process for individuals applying for various positions. Trust us to assist you in your application process.',
            'icon' => '🏛️',
            'image' => 'https://demo.bankajk.com/wp-content/uploads/2023/10/psc.jpg',
            'sort_order' => 3,
        ]);

        $pscAttributes = [
            ['attribute_name' => 'Services Offered', 'attribute_value' => 'Application fee collection, Form distribution', 'sort_order' => 1],
            ['attribute_name' => 'Target Candidates', 'attribute_value' => 'AJK Public Service Commission applicants', 'sort_order' => 2],
            ['attribute_name' => 'Branch Availability', 'attribute_value' => 'All branches', 'sort_order' => 3],
            ['attribute_name' => 'Process Benefits', 'attribute_value' => 'Seamless application process, Efficient service', 'sort_order' => 4],
            ['attribute_name' => 'Additional Services', 'attribute_value' => 'Application guidance, Form assistance', 'sort_order' => 5],
            ['attribute_name' => 'Required Documents', 'attribute_value' => 'CNIC, Educational certificates, Application form', 'sort_order' => 6],
        ];

        foreach ($pscAttributes as $attr) {
            ServiceAttribute::create(array_merge($attr, ['service_id' => $pscService->id]));
        }

        // Home Remittance
        $remittanceService = Service::create([
            'name' => 'Home Remittance',
            'slug' => 'home-remittance',
            'description' => 'The bank has made adequate arrangements with major scheduled banks for the purpose of inter bank settlements and outward remittances. Under an arrangement with HBL all Banker Cheques issued by BAJK branches are payable on all branches of HBL.',
            'icon' => '💸',
            'image' => 'https://demo.bankajk.com/wp-content/uploads/2023/10/remittance.jpg',
            'sort_order' => 4,
        ]);

        $remittanceAttributes = [
            ['attribute_name' => 'MoneyGram Service', 'attribute_value' => 'Global money transfer with 350,000+ locations in 200+ countries. Find locations: https://www.moneygram.com/locations', 'sort_order' => 1],
            ['attribute_name' => 'RIA Money Transfer', 'attribute_value' => 'World\'s largest money transfer service in 147+ countries with 287,000+ locations. Find locations: https://www.riamoneytransfer.com/ria-locator', 'sort_order' => 2],
            ['attribute_name' => 'Western Union', 'attribute_value' => 'Financial services company offering money transfers in 200+ countries since 1851. Online, in-person, and phone services available', 'sort_order' => 3],
            ['attribute_name' => 'HBL Partnership', 'attribute_value' => 'All Banker Cheques issued by BAJK branches payable on all HBL branches', 'sort_order' => 4],
            ['attribute_name' => 'Home Remittance Facility', 'attribute_value' => 'Customers can receive home remittances from all bank branches', 'sort_order' => 5],
            ['attribute_name' => 'Additional Services', 'attribute_value' => 'Bill payment, Money orders, Prepaid debit cards', 'sort_order' => 6],
        ];

        foreach ($remittanceAttributes as $attr) {
            ServiceAttribute::create(array_merge($attr, ['service_id' => $remittanceService->id]));
        }

        // // Additional dynamic services for testing menu integration
        // $creditCardService = Service::create([
        //     'name' => 'Credit Card Services',
        //     'slug' => 'credit-card-services',
        //     'description' => 'Comprehensive credit card services offering various card types to meet your financial needs and spending requirements.',
        //     'icon' => '💳',
        //     'image' => null,
        //     'sort_order' => 5,
        // ]);

        // $creditCardAttributes = [
        //     ['attribute_name' => 'Card Types', 'attribute_value' => 'Classic, Gold, Platinum cards available', 'sort_order' => 1],
        //     ['attribute_name' => 'Features', 'attribute_value' => 'Cashback rewards, Online shopping, International acceptance', 'sort_order' => 2],
        //     ['attribute_name' => 'Security', 'attribute_value' => 'EMV chip technology, SMS alerts, 24/7 fraud monitoring', 'sort_order' => 3],
        // ];

        // foreach ($creditCardAttributes as $attr) {
        //     ServiceAttribute::create(array_merge($attr, ['service_id' => $creditCardService->id]));
        // }

        // $mobileService = Service::create([
        //     'name' => 'Mobile Banking',
        //     'slug' => 'mobile-banking',
        //     'description' => 'Access your bank account anytime, anywhere with our secure mobile banking application.',
        //     'icon' => '📱',
        //     'image' => null,
        //     'sort_order' => 6,
        // ]);

        // $mobileAttributes = [
        //     ['attribute_name' => 'Available Platforms', 'attribute_value' => 'iOS and Android applications', 'sort_order' => 1],
        //     ['attribute_name' => 'Features', 'attribute_value' => 'Balance inquiry, Fund transfer, Bill payment', 'sort_order' => 2],
        //     ['attribute_name' => 'Security', 'attribute_value' => 'Biometric authentication, PIN security', 'sort_order' => 3],
        // ];

        // foreach ($mobileAttributes as $attr) {
        //     ServiceAttribute::create(array_merge($attr, ['service_id' => $mobileService->id]));
        // }

        // $atmService = Service::create([
        //     'name' => 'ATM Services',
        //     'slug' => 'atm-services',
        //     'description' => 'Wide network of ATMs providing 24/7 banking services across AJK region.',
        //     'icon' => '🏧',
        //     'image' => null,
        //     'sort_order' => 7,
        // ]);

        // $atmAttributes = [
        //     ['attribute_name' => 'Network Coverage', 'attribute_value' => '50+ ATMs across AJK', 'sort_order' => 1],
        //     ['attribute_name' => 'Services', 'attribute_value' => 'Cash withdrawal, Balance inquiry, Mini statement', 'sort_order' => 2],
        //     ['attribute_name' => 'Operating Hours', 'attribute_value' => '24/7 availability', 'sort_order' => 3],
        // ];

        // foreach ($atmAttributes as $attr) {
        //     ServiceAttribute::create(array_merge($attr, ['service_id' => $atmService->id]));
        // }
    }
}
