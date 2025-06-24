<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopNavbarMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $messages = [
            [
                'type' => 'Achievement',
                'priority' => 'high',
                'icon' => '🏆',
                'text' => "Bank of Azad Jammu and Kashmir achieved an operating profit of 2+ Billion Rupees in 2024 - Leading AJK's financial growth",
                'color' => 'from-emerald-500 to-green-600',
                'bg_color' => 'from-emerald-50 to-green-50',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'type' => 'Services',
                'priority' => 'urgent',
                'icon' => '💰',
                'text' => 'Enhanced Loan Limits: Gold loans up to 2 Million & Advance salary loans up to 3 Million from designated BAJK branches',
                'color' => 'from-blue-500 to-cyan-600',
                'bg_color' => 'from-blue-50 to-cyan-50',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'type' => 'Support',
                'priority' => 'high',
                'icon' => '📞',
                'text' => "24/7 Customer Support Available - Call UAN +92.300.8169925 - We're here to help you anytime, anywhere",
                'color' => 'from-purple-500 to-pink-600',
                'bg_color' => 'from-purple-50 to-pink-50',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'type' => 'Digital',
                'priority' => 'medium',
                'icon' => '📱',
                'text' => 'Experience Digital Banking - Download BAJK Mobile App for instant transactions, loan applications & account management',
                'color' => 'from-orange-500 to-red-600',
                'bg_color' => 'from-orange-50 to-red-50',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'type' => 'General',
                'priority' => 'medium',
                'icon' => '🏪',
                'text' => 'Serving Azad Kashmir with excellence - Visit our branches across the region for all your banking needs',
                'color' => 'from-teal-500 to-blue-600',
                'bg_color' => 'from-teal-50 to-blue-50',
                'is_active' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($messages as $message) {
            \App\Models\TopNavbarMessage::create($message);
        }
    }
}
