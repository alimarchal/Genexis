<?php

namespace Database\Seeders;

use App\Models\AboutUs;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutUsSeeder extends Seeder
{
    public function run(): void
    {
        AboutUs::create([
            'title' => 'About BAJK',
            'content' => 'BAJK is a fast growing commercial bank operating across the state of Azad Jammu & Kashmir with a network of 87 branches. The Bank is a wholly owned corporate entity of the Govt. of Azad Jammu & Kashmir mandated to mobilize private savings and public funds for diverting them to productive channels; promote industrial, agriculture, rural micro financing and other socio economic activities through active participation of private and public sectors and help under-developed areas, create employment opportunities and to assist overseas Kashmiris to effectively and profitably invest their savings in the State. The bank has a number of liability and assets products customized to fulfill the banking needs of people. The Bank believes that equal access to resources in the economy is smart economics and a powerful means of poverty reduction and a path to faster socio economic development. That is why the Bank has launched an innovative scheme of microfinance for those who have limited or no access to financial resources.

A number of MOUs have been signed with various Govt. Departments where under markup free financing was available for eligible businesses. Bank\'s deposit schemes are highly attractive and core lending products cover Agriculture, SMEs, Live Stock, Poultry, Micro Finance and Small business sectors are on low mark up rates.

The bank serves all segments of the society particularly the women and senior citizens are being served as priority customers.

To facilitate its customers in routing their payments/funds in Pakistan, the bank has standing arrangements with other commercial banks whereby Banker Cheques drawn by BAJK branches are payable at all such branches in Pakistan. Besides this, the bank has correspondent arrangements with major scheduled banks to facilitate inter-bank settlements on account of customers.

The bank is actively engaged in promoting home remittances by active participation in Pakistan Remittance Initiative (PRI) scheme of GOP, through which, customers can receive their home remittances routed through leading Exchange Companies including Moneygram, Western Union, IME, INSTANT CASH and RIA. Under these arrangements a fast and convenient payment system is in place for payment of inward home remittances in minutes through dedicated desks in all the branches.

The Bank also offers conventional banking services such as safe custody and safe deposit facilities on competitive rates. The bank also offers cash management services to its corporate customers on need basis.

A lot has changed since the BAJK started its operations in 2006 through its 1st Branch in Muzaffarabad. The Bank has expanded its outreach to 87 locations in all districts of state, some in far off places where other banks are not present. From customized product offering to the technology being acquired to support our service delivery channels, one thing has never changed which is its focus to change the socio economic conditions of the people of the State. Ever since its inception, we have remained committed to serve the people with enthusiasm, dedication and highest sense of responsibility. During this period we have been able to earn the trust of our valued customers, who have by choice established their relationship with us. Today we have a franchise of enormous customers being served by a dedicated team of professionals.

The bank has a dedicated team of professionals fully capable to provide services with energy, zeal and commitment. The bank attaches top priority to service delivery, therefore investing considerably in IT and Human Capital to evolve a powerful brand, which is competitive, sustainable and trusted by its customers.

Core Values:  
Quality, Team Work, Responsibility, Achievement, Innovation, Ideas, Trust, People.',
            'vision' => 'To act as a premier financial institution, fostering socio- economic development of the people of AJK.',
            'mission' => 'To acquire market leadership through quality banking services as a customer-focused and socially responsible institution. Promote products, best business practices, and customized solutions for participation in development processes of the state for the well-being of its people.',
           
             'is_active' => true,
            'sort_order' => 1,
        ]);
    }
}
