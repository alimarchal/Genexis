<?php

namespace Database\Seeders;

use App\Models\NewsAnnouncement;
use Illuminate\Database\Seeder;

class NewsAnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample news announcements
        NewsAnnouncement::create([
            'title' => 'New Digital Banking Services Launch',
            'content' => 'Bank of Azad Jammu & Kashmir is excited to announce the launch of our new digital banking services. These services will provide customers with convenient access to their accounts, transfer capabilities, and much more from the comfort of their homes.',
            'image' => 'https://via.placeholder.com/800x600/1e40af/ffffff?text=Digital+Banking',
            'published_date' => now()->subDays(5),
            'is_featured' => true,
            'category' => 'banking',
            'slug' => 'new-digital-banking-services-launch',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Extended Banking Hours for Eid',
            'content' => 'In preparation for the upcoming Eid celebrations, Bank of Azad Jammu & Kashmir will be extending banking hours at select branches. This will ensure our customers have convenient access to banking services during the festive season.',
            'image' => 'https://via.placeholder.com/800x600/059669/ffffff?text=Eid+Banking',
            'published_date' => now()->subDays(10),
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'extended-banking-hours-for-eid',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'New Branch Opening in Muzaffarabad',
            'content' => 'We are pleased to announce the opening of our new branch in Muzaffarabad. This new location will serve the growing needs of our customers in the region with full banking services.',
            'image' => 'https://via.placeholder.com/800x600/dc2626/ffffff?text=New+Branch',
            'published_date' => now()->subDays(15),
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'new-branch-opening-in-muzaffarabad',
            'is_published' => true,
        ]);

        // Create additional random news announcements
        NewsAnnouncement::factory(15)->create();
    }
}
