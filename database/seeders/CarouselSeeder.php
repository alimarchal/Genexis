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
                'title' => 'Customer Support 24/7',
                'description' => 'We\'re here to help you with all your banking needs anytime, anywhere with dedicated support.',
                'image' => 'carousel-images/smtf.png',
                'button_text' => 'Contact Us',
                'button_url' => '/contact',
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
                'title' => 'Gold Loan ',
                'description' => 'Experience seamless banking with our innovative digital platform designed for modern financial needs.',
                'image' => 'carousel-images/gold_loan.jpg',
                'button_text' => 'Learn More',
                'button_url' => '/gold-loan',
                'order' => 3,
                'status' => 'active',
                'created_by' => 1,
            ],
             
        ];

        foreach ($carouselData as $carousel) {
            Carousel::create($carousel);
        }
    }
}
