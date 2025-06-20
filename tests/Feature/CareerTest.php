<?php

namespace Tests\Feature;

use App\Models\Career;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CareerTest extends TestCase
{
    use RefreshDatabase;

    public function test_career_can_be_created(): void
    {
        $career = Career::create([
            'title' => 'Software Developer',
            'description' => 'We are looking for a skilled software developer.',
            'requirements' => 'Bachelor degree in Computer Science',
            'location' => 'Remote',
            'is_active' => true,
            'is_featured' => false,
        ]);

        $this->assertInstanceOf(Career::class, $career);
        $this->assertEquals('Software Developer', $career->title);
    }

    public function test_career_scopes_work_correctly(): void
    {
        $activeCareer = Career::factory()->create(['is_active' => true, 'is_featured' => false]);
        $inactiveCareer = Career::factory()->create(['is_active' => false, 'is_featured' => false]);
        $featuredCareer = Career::factory()->create(['is_active' => false, 'is_featured' => true]);

        $this->assertCount(1, Career::active()->get());
        $this->assertCount(1, Career::featured()->get());
    }

    public function test_career_status_attribute(): void
    {
        $activeCareer = Career::factory()->create([
            'is_active' => true,
            'closing_date' => now()->addDays(5)
        ]);

        $closedCareer = Career::factory()->create([
            'is_active' => true,
            'closing_date' => now()->subDays(5)
        ]);

        $inactiveCareer = Career::factory()->create(['is_active' => false]);

        $this->assertEquals('open', $activeCareer->status);
        $this->assertEquals('closed', $closedCareer->status);
        $this->assertEquals('inactive', $inactiveCareer->status);
    }
}