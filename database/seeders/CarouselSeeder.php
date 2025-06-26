<?php

namespace Database\Seeders;

use App\Models\Carousel;
use Illuminate\Database\Seeder;

class CarouselSeeder extends Seeder
{
    public function run(): void
    {
        $carouselData = [
            [
                'title' => 'Gold Loan ',
                'description' => 'Experience seamless banking with our innovative digital platform designed for modern financial needs.',
                'image' => 'carousel-images/gold_loan.jpg',
                'button_text' => 'Learn More',
                'button_url' => '/gold-loan',
                'order' => 1,
                'status' => 'active',
                'created_by' => 1,
            ],
              [
                'title' => 'Car Finance',
                'description' => 'Enjoy the drive of your dreams with our simple and accessible car financing solutions across Azad Jammu & Kashmir.',
                'image' => 'carousel-images/cardrive.png',
                'button_text' => 'Explore',
                'button_url' => '/products/consumer-finances',
                'order' => 2,
                'status' => 'active',
                'created_by' => 1,
            ],
            [
                'title' => 'Personal Loans Made Simple',
                'description' => 'Quick approval and competitive rates for all your financial needs with hassle-free documentation.',
                'image' => 'carousel-images/personal_loans.jpg',
                'button_text' => 'Apply Now',
                'button_url' => '/personal-loans',
                'order' => 3,
                'status' => 'active',
                'created_by' => 1,
            ],
          
            [
                'title' => 'Business Banking Excellence',
                'description' => 'Comprehensive financial solutions tailored for your business growth and operational efficiency.',
                'image' => 'carousel-images/business_banking.jpg',
                'button_text' => 'Get Started',
                'button_url' => '/business-banking',
                'order' => 4,
                'status' => 'active',
                'created_by' => 1,
            ],
            [
                'title' => 'Customer Support 24/7',
                'description' => 'We\'re here to help you with all your banking needs anytime, anywhere with dedicated support.',
                'image' => 'carousel-images/customer_support.jpg',
                'button_text' => 'Contact Us',
                'button_url' => '/contact',
                'order' => 5,
                'status' => 'active',
                'created_by' => 1,
            ],
        ];

        foreach ($carouselData as $carousel) {
            Carousel::create($carousel);
        }
    }
}
