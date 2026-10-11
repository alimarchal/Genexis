<?php

use App\Models\Branch;
use App\Models\Career;
use App\Models\Carousel;
use App\Models\ContactSubmission;
use App\Models\NewsAnnouncement;
use App\Models\User;
use Database\Seeders\DivisionSeeder;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Permission;

beforeEach(function () {
    $this->seed(RoleAndPermissionSeeder::class);
    $this->seed(DivisionSeeder::class);
    $this->admin = User::factory()->create();
    $this->admin->assignRole('super-admin');
});

describe('dashboard stats', function () {
    it('counts only active branches and published, already-dated news', function () {
        Branch::factory()->count(2)->create(['status' => 'active']);
        Branch::factory()->create(['status' => 'inactive']);
        NewsAnnouncement::factory()->create(['is_published' => true, 'published_date' => now()->subDay(), 'slug' => 'a']);
        NewsAnnouncement::factory()->create(['is_published' => false, 'published_date' => now()->subDay(), 'slug' => 'b']);
        NewsAnnouncement::factory()->create(['is_published' => true, 'published_date' => now()->addWeek(), 'slug' => 'c']);

        $this->actingAs($this->admin)->get(route('dashboard'))->assertInertia(function ($page) {
            $stats = collect($page->toArray()['props']['stats'])->keyBy('key');

            expect($stats['branches']['value'])->toBe(2)
                ->and($stats['branches']['hint'])->toBe('3 in total')
                ->and($stats['news']['value'])->toBe(1)
                ->and($stats['news']['hint'])->toBe('3 in total');
        });
    });

    it('counts open vacancies using the same rule as the public site', function () {
        Career::factory()->create(['is_active' => true, 'closing_date' => null]);
        Career::factory()->create(['is_active' => true, 'closing_date' => now()->toDateString()]);
        Career::factory()->create(['is_active' => true, 'closing_date' => now()->subDay()->toDateString()]);
        Career::factory()->create(['is_active' => false, 'closing_date' => null]);

        $this->actingAs($this->admin)->get(route('dashboard'))->assertInertia(function ($page) {
            $careers = collect($page->toArray()['props']['stats'])->firstWhere('key', 'careers');

            expect($careers['value'])->toBe(2);
        });
    });

    it('flags content that needs attention', function () {
        Storage::fake('public');
        Career::factory()->create(['is_active' => true, 'closing_date' => now()->addDays(3)->toDateString()]);
        Career::factory()->create(['is_active' => true, 'closing_date' => now()->addDays(30)->toDateString()]);
        NewsAnnouncement::factory()->create(['is_published' => false, 'slug' => 'draft']);
        NewsAnnouncement::factory()->create(['is_published' => true, 'published_date' => now()->addDays(5), 'slug' => 'later']);
        Branch::factory()->create(['status' => 'active', 'latitude' => null, 'longitude' => null]);
        Branch::factory()->create(['status' => 'active', 'latitude' => 34.3, 'longitude' => 73.4]);
        Carousel::factory()->create(['status' => 'inactive']);

        $this->actingAs($this->admin)->get(route('dashboard'))->assertInertia(function ($page) {
            $attention = collect($page->toArray()['props']['attention'])->pluck('count', 'key');

            expect($attention['careers_closing'])->toBe(1)
                ->and($attention['news_drafts'])->toBe(1)
                ->and($attention['news_scheduled'])->toBe(1)
                ->and($attention['branches_no_gps'])->toBe(1)
                ->and($attention['slides_inactive'])->toBe(1);
        });
    });
});

describe('dashboard permissions', function () {
    it('shows a limited user only the areas they may view', function () {
        $editor = User::factory()->create();
        $editor->givePermissionTo('view careers');
        Branch::factory()->create(['status' => 'active']);

        $this->actingAs($editor)->get(route('dashboard'))->assertInertia(function ($page) {
            $props = $page->toArray()['props'];

            expect(collect($props['stats'])->pluck('key')->all())->toBe(['careers'])
                ->and(collect($props['attention'])->pluck('key')->all())->toBe(['careers_closing'])
                ->and($props['messages'])->toBeNull();
        });
    });

    it('still renders for a user with no permissions', function () {
        $this->actingAs(User::factory()->create())->get(route('dashboard'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->where('stats', [])->where('attention', [])->where('messages', null));
    });

    it('redirects guests to login', function () {
        $this->get(route('dashboard'))->assertRedirect(route('login'));
    });
});

describe('contact message summary', function () {
    it('builds a 14 day series with zero-filled days and correct totals', function () {
        $this->travelTo(now()->setTime(12, 0));
        ContactSubmission::factory()->count(2)->create(['submitted_at' => now()]);
        ContactSubmission::factory()->create(['submitted_at' => now()->subDays(3)]);
        ContactSubmission::factory()->create(['submitted_at' => now()->subDays(20)]);
        ContactSubmission::factory()->create(['submitted_at' => now()->subDays(60)]);

        $this->actingAs($this->admin)->get(route('dashboard'))->assertInertia(function ($page) {
            $messages = $page->toArray()['props']['messages'];
            $series = collect($messages['series']);

            expect($series)->toHaveCount(14)
                ->and($series->last()['date'])->toBe(now()->toDateString())
                ->and($series->last()['count'])->toBe(2)
                ->and($series->firstWhere('date', now()->subDays(3)->toDateString())['count'])->toBe(1)
                ->and($series->sum('count'))->toBe(3)
                ->and($messages['total'])->toBe(5)
                ->and($messages['last_7_days'])->toBe(3)
                ->and($messages['last_30_days'])->toBe(4);
        });
    });

    it('lists the five newest messages without exposing the message body', function () {
        foreach (range(1, 7) as $i) {
            ContactSubmission::factory()->create(['subject' => "Subject $i", 'message' => 'SECRET BODY', 'submitted_at' => now()->subMinutes(10 - $i)]);
        }

        $this->actingAs($this->admin)->get(route('dashboard'))->assertInertia(function ($page) {
            $recent = $page->toArray()['props']['messages']['recent'];

            expect($recent)->toHaveCount(5)
                ->and($recent[0]['subject'])->toBe('Subject 7')
                ->and(json_encode($recent))->not->toContain('SECRET BODY')
                ->and($recent[0])->not->toHaveKeys(['email', 'phone', 'message', 'ip_address']);
        });
    });
});

describe('contact message inbox', function () {
    it('needs the view permission', function () {
        $submission = ContactSubmission::factory()->create();

        $this->actingAs(User::factory()->create())->get(route('admin.contact-submissions.index'))->assertForbidden();
        $this->actingAs(User::factory()->create())->get(route('admin.contact-submissions.show', $submission))->assertForbidden();
    });

    it('lets a permitted user read but not delete without the delete permission', function () {
        $reader = User::factory()->create();
        $reader->givePermissionTo('view contact submissions');
        $submission = ContactSubmission::factory()->create(['message' => 'Please call me']);

        $this->actingAs($reader)->get(route('admin.contact-submissions.index'))->assertOk();
        $this->actingAs($reader)->get(route('admin.contact-submissions.show', $submission))
            ->assertOk()
            ->assertInertia(fn ($page) => $page->where('submission.message', 'Please call me'));
        $this->actingAs($reader)->delete(route('admin.contact-submissions.destroy', $submission))->assertForbidden();

        expect(ContactSubmission::count())->toBe(1);
    });

    it('deletes with the delete permission', function () {
        $moderator = User::factory()->create();
        $moderator->givePermissionTo(['view contact submissions', 'delete contact submissions']);
        $submission = ContactSubmission::factory()->create();

        $this->actingAs($moderator)->delete(route('admin.contact-submissions.destroy', $submission))
            ->assertRedirect(route('admin.contact-submissions.index'));

        expect(ContactSubmission::count())->toBe(0);
    });

    it('searches name, email, subject and message and filters by category', function () {
        ContactSubmission::factory()->create(['name' => 'Alice', 'subject' => 'Loan question', 'category' => 'general_inquiry']);
        ContactSubmission::factory()->create(['name' => 'Bob', 'subject' => 'Card lost', 'message' => 'Please block my card', 'category' => 'complaint']);

        $names = fn (string $query) => collect(
            $this->actingAs($this->admin)->get(route('admin.contact-submissions.index').$query)->viewData('page')['props']['submissions']['data']
        )->pluck('name')->all();

        expect($names('?search=loan'))->toBe(['Alice'])
            ->and($names('?search=block'))->toBe(['Bob'])
            ->and($names('?category=complaint'))->toBe(['Bob'])
            ->and($names('?search=100%25'))->toBe([]);
    });

    it('stores new contact-form messages in the inbox even when mail is down', function () {
        Mail::shouldReceive('to')->andThrow(new RuntimeException('SMTP down'));

        $this->postJson(route('contact.submit'), [
            'name' => 'Visitor',
            'email' => 'visitor@example.test',
            'category' => 'general_inquiry',
            'subject' => 'Help',
            'message' => 'Need help',
        ])->assertOk();

        $this->actingAs($this->admin)->get(route('admin.contact-submissions.index'))
            ->assertInertia(fn ($page) => $page->where('submissions.data.0.email', 'visitor@example.test'));
    });
});

it('creates the contact submission permissions through the migration on existing installs', function () {
    Permission::where('name', 'like', '%contact submissions')->delete();

    (require database_path('migrations/2026_10_11_210855_add_contact_submission_permissions.php'))->up();

    expect(Permission::whereIn('name', ['view contact submissions', 'delete contact submissions'])->count())->toBe(2);
});
