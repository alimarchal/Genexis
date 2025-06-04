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
                'title' => 'Digital Banking Solutions',
                'description' => 'Experience seamless banking with our innovative digital platform designed for modern financial needs.',
                'image' => 'carousel/digital_banking.jpg',
                'button_text' => 'Learn More',
                'button_url' => '/digital-banking',
                'order' => 1,
                'status' => 'active',
                'created_by' => 1,
            ],
            [
                'title' => 'Personal Loans Made Simple',
                'description' => 'Quick approval and competitive rates for all your financial needs with hassle-free documentation.',
                'image' => 'carousel/personal_loans.jpg',
                'button_text' => 'Apply Now',
                'button_url' => '/personal-loans',
                'order' => 2,
                'status' => 'active',
                'created_by' => 1,
            ],
            [
                'title' => 'Investment Opportunities',
                'description' => 'Grow your wealth with our expert investment advisory services and diversified portfolio options.',
                'image' => 'carousel/investments.jpg',
                'button_text' => 'Explore',
                'button_url' => '/investments',
                'order' => 3,
                'status' => 'active',
                'created_by' => 1,
            ],
            [
                'title' => 'Business Banking Excellence',
                'description' => 'Comprehensive financial solutions tailored for your business growth and operational efficiency.',
                'image' => 'carousel/business_banking.jpg',
                'button_text' => 'Get Started',
                'button_url' => '/business-banking',
                'order' => 4,
                'status' => 'active',
                'created_by' => 1,
            ],
            [
                'title' => 'Customer Support 24/7',
                'description' => 'We\'re here to help you with all your banking needs anytime, anywhere with dedicated support.',
                'image' => 'carousel/customer_support.jpg',
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
