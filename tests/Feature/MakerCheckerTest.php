<?php

use App\Enums\ChangeRequestStatus;
use App\Models\ChangeRequest;
use App\Models\Download;
use App\Models\UploadSession;
use App\Models\User;
use App\Services\ChunkedUploadService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('local');
    Storage::fake('public');

    $this->checker = $this->createAdminUser();

    $this->maker = User::factory()->create();
    $this->maker->givePermissionTo([
        'submit changes for approval', 'view downloads', 'create downloads', 'edit downloads', 'delete downloads',
    ]);

    $this->payload = fn (array $overrides = []) => array_merge([
        'title' => 'Tender notice',
        'category' => 'Document',
        'is_active' => true,
        'file' => UploadedFile::fake()->createWithContent('notice.pdf', pdfBytes(400)),
    ], $overrides);
});

describe('a maker adds, edits or deletes', function () {
    it('holds a new record as pending instead of saving it', function () {
        $this->actingAs($this->maker)->post(route('downloads.store'), ($this->payload)())
            ->assertRedirect(route('admin.change-requests.index'))
            ->assertSessionHas('success');

        expect(Download::count())->toBe(0);

        $change = ChangeRequest::firstOrFail();
        expect($change->status)->toBe(ChangeRequestStatus::Pending)
            ->and($change->maker_id)->toBe($this->maker->id)
            ->and($change->action)->toBe('create')
            ->and($change->module_label)->toBe('Downloads')
            ->and($change->summary)->toBe('Tender notice')
            ->and($change->checker_id)->toBeNull()
            ->and($change->files)->toHaveCount(1);

        $this->get('/documents')->assertInertia(fn ($page) => $page->where('downloads.total', 0));
    });

    it('holds an edit and leaves the live record untouched', function () {
        $download = Download::factory()->create(['title' => 'Old title', 'category' => 'Document', 'is_active' => true]);

        $this->actingAs($this->maker)->put(route('downloads.update', $download), ['title' => 'New title', 'category' => 'Form'])
            ->assertRedirect(route('admin.change-requests.index'));

        expect($download->fresh()->title)->toBe('Old title');

        $change = ChangeRequest::firstOrFail();
        expect($change->action)->toBe('update')
            ->and($change->subject_id)->toBe($download->id)
            ->and($change->summary)->toBe('New title');
    });

    it('holds a delete and keeps the record', function () {
        $download = Download::factory()->create();

        $this->actingAs($this->maker)->delete(route('downloads.destroy', $download))
            ->assertRedirect(route('admin.change-requests.index'));

        expect(Download::whereKey($download->id)->exists())->toBeTrue()
            ->and(ChangeRequest::firstOrFail()->action)->toBe('delete');
    });

    it('is told about validation errors straight away and nothing is queued', function () {
        $this->actingAs($this->maker)->from(route('downloads.create'))->post(route('downloads.store'), ($this->payload)(['title' => '', 'category' => 'bogus']))
            ->assertSessionHasErrors(['title', 'category']);

        expect(ChangeRequest::count())->toBe(0);
    });

    it('is still stopped by the normal permission check', function () {
        $viewer = User::factory()->create();
        $viewer->givePermissionTo(['submit changes for approval', 'view downloads']);

        $this->actingAs($viewer)->post(route('downloads.store'), ($this->payload)())->assertForbidden();

        expect(ChangeRequest::count())->toBe(0);
    });
});

describe('users who are not makers', function () {
    it('keep saving directly', function () {
        $this->actingAs($this->checker)->post(route('downloads.store'), ($this->payload)())
            ->assertRedirect(route('downloads.index'));

        expect(Download::count())->toBe(1)->and(ChangeRequest::count())->toBe(0);
    });
});

describe('a checker', function () {
    function holdNewDownload($test): ChangeRequest
    {
        $test->actingAs($test->maker)->post(route('downloads.store'), ($test->payload)());

        return ChangeRequest::firstOrFail();
    }

    it('approves a new record, which then goes live as the maker\'s work', function () {
        $change = holdNewDownload($this);
        $storedCopy = $change->files[0]['path'];
        Storage::disk('local')->assertExists($storedCopy);

        $this->actingAs($this->checker)->post(route('admin.change-requests.approve', $change))
            ->assertRedirect(route('admin.change-requests.index'))
            ->assertSessionHas('success');

        $download = Download::firstOrFail();
        expect($download->title)->toBe('Tender notice')
            ->and($download->created_by)->toBe($this->maker->id)
            ->and($download->file_type)->toBe('application/pdf');
        Storage::disk('public')->assertExists($download->file_path);
        Storage::disk('local')->assertMissing($storedCopy);

        $change->refresh();
        expect($change->status)->toBe(ChangeRequestStatus::Approved)
            ->and($change->checker_id)->toBe($this->checker->id)
            ->and($change->reviewed_at)->not->toBeNull();

        $this->get('/documents')->assertInertia(fn ($page) => $page->where('downloads.total', 1));
    });

    it('approves an edit', function () {
        $download = Download::factory()->create(['title' => 'Old title', 'category' => 'Document']);
        $this->actingAs($this->maker)->put(route('downloads.update', $download), ['title' => 'New title', 'category' => 'Form']);

        $this->actingAs($this->checker)->post(route('admin.change-requests.approve', ChangeRequest::firstOrFail()))->assertSessionHas('success');

        expect($download->fresh())->title->toBe('New title')->category->toBe('Form')->updated_by->toBe($this->maker->id);
    });

    it('approves a delete', function () {
        $download = Download::factory()->create();
        $this->actingAs($this->maker)->delete(route('downloads.destroy', $download));

        $this->actingAs($this->checker)->post(route('admin.change-requests.approve', ChangeRequest::firstOrFail()))->assertSessionHas('success');

        expect(Download::whereKey($download->id)->exists())->toBeFalse();
    });

    it('rejects with a reason, which keeps the change out of the website and on the log', function () {
        $change = holdNewDownload($this);

        $this->actingAs($this->checker)->post(route('admin.change-requests.reject', $change), ['reason' => 'Wrong category'])
            ->assertRedirect(route('admin.change-requests.index'));

        $change->refresh();
        expect(Download::count())->toBe(0)
            ->and($change->status)->toBe(ChangeRequestStatus::Rejected)
            ->and($change->rejection_reason)->toBe('Wrong category')
            ->and($change->checker_id)->toBe($this->checker->id)
            ->and($change->reviewed_at)->not->toBeNull();
        Storage::disk('local')->assertMissing($change->files[0]['path']);
    });

    it('must give a reason to reject', function (string $reason) {
        $change = holdNewDownload($this);

        $this->actingAs($this->checker)->from(route('admin.change-requests.show', $change))
            ->post(route('admin.change-requests.reject', $change), ['reason' => $reason])
            ->assertSessionHasErrors('reason');

        expect($change->fresh()->isPending())->toBeTrue();
    })->with(['empty' => '', 'too short' => 'no']);

    it('cannot decide the same change twice', function () {
        $change = holdNewDownload($this);
        $this->actingAs($this->checker)->post(route('admin.change-requests.approve', $change));

        $this->actingAs($this->checker)->post(route('admin.change-requests.approve', $change))->assertSessionHas('error');
        $this->actingAs($this->checker)->post(route('admin.change-requests.reject', $change), ['reason' => 'Too late'])->assertSessionHas('error');

        expect(Download::count())->toBe(1)->and($change->fresh()->status)->toBe(ChangeRequestStatus::Approved);
    });

    it('is told when the change no longer applies and it stays pending with the reason', function () {
        $download = Download::factory()->create();
        $this->actingAs($this->maker)->put(route('downloads.update', $download), ['title' => 'Edited', 'category' => 'Form']);
        $download->delete();

        $this->actingAs($this->checker)->post(route('admin.change-requests.approve', ChangeRequest::firstOrFail()))
            ->assertSessionHas('error', 'The record this change is about no longer exists.');

        $change = ChangeRequest::firstOrFail();
        expect($change->isPending())->toBeTrue()->and($change->failure_reason)->toContain('no longer exists');
    });

    it('does not leave a half-applied change behind when approval fails', function () {
        $change = holdNewDownload($this);
        Storage::disk('local')->delete($change->files[0]['path']);

        $this->actingAs($this->checker)->post(route('admin.change-requests.approve', $change))->assertSessionHas('error');

        expect(Download::count())->toBe(0)->and($change->fresh()->isPending())->toBeTrue();
    });
});

describe('separation of duties', function () {
    it('stops a maker approving their own change, even when they also hold the checker permission', function () {
        $this->maker->givePermissionTo('approve changes');
        $this->actingAs($this->maker)->post(route('downloads.store'), ($this->payload)());
        $change = ChangeRequest::firstOrFail();

        $this->actingAs($this->maker)->post(route('admin.change-requests.approve', $change))
            ->assertSessionHas('error', 'You cannot approve a change you made yourself. Ask another checker.');

        expect(Download::count())->toBe(0)->and($change->fresh()->isPending())->toBeTrue();
    });

    it('only lets users with the checker permission decide', function () {
        $this->actingAs($this->maker)->post(route('downloads.store'), ($this->payload)());
        $change = ChangeRequest::firstOrFail();

        $this->actingAs($this->maker)->post(route('admin.change-requests.approve', $change))->assertForbidden();
        $this->actingAs($this->maker)->post(route('admin.change-requests.reject', $change), ['reason' => 'Because'])->assertForbidden();
        $this->actingAs(User::factory()->create())->post(route('admin.change-requests.approve', $change))->assertForbidden();

        expect($change->fresh()->isPending())->toBeTrue();
    });

    it('does not show the approve action for a checker\'s own submission', function () {
        $checkerAsMaker = User::factory()->create();
        $checkerAsMaker->givePermissionTo(['submit changes for approval', 'approve changes', 'create downloads']);
        $this->actingAs($checkerAsMaker)->post(route('downloads.store'), ($this->payload)());

        $this->get(route('admin.change-requests.index'))
            ->assertInertia(fn ($page) => $page->where('changeRequests.data.0.can_decide', false));
    });
});

describe('the approvals screen', function () {
    beforeEach(function () {
        $this->otherMaker = User::factory()->create();
        $this->otherMaker->givePermissionTo(['submit changes for approval', 'create downloads']);

        $this->actingAs($this->maker)->post(route('downloads.store'), ($this->payload)(['title' => 'Mine']));
        $this->actingAs($this->otherMaker)->post(route('downloads.store'), ($this->payload)(['title' => 'Theirs']));
    });

    it('shows a checker every change', function () {
        $this->actingAs($this->checker)->get(route('admin.change-requests.index'))
            ->assertInertia(fn ($page) => $page->component('ChangeRequests/Index')->has('changeRequests.data', 2)->where('isChecker', true));
    });

    it('shows a maker only their own changes', function () {
        $this->actingAs($this->maker)->get(route('admin.change-requests.index'))
            ->assertInertia(fn ($page) => $page->has('changeRequests.data', 1)->where('changeRequests.data.0.summary', 'Mine')->where('isChecker', false));
    });

    it('lets a maker open only their own change', function () {
        $theirs = ChangeRequest::where('summary', 'Theirs')->firstOrFail();
        $mine = ChangeRequest::where('summary', 'Mine')->firstOrFail();

        $this->actingAs($this->maker)->get(route('admin.change-requests.show', $theirs))->assertForbidden();
        $this->actingAs($this->maker)->get(route('admin.change-requests.show', $mine))->assertOk();
    });

    it('shows a checker the proposed values next to the current ones', function () {
        $download = Download::factory()->create(['title' => 'Old']);
        $this->actingAs($this->maker)->put(route('downloads.update', $download), ['title' => 'Proposed', 'category' => 'Form']);
        $change = ChangeRequest::where('summary', 'Proposed')->firstOrFail();

        $this->actingAs($this->checker)->get(route('admin.change-requests.show', $change))
            ->assertInertia(fn ($page) => $page
                ->component('ChangeRequests/Show')
                ->where('changeRequest.payload.title', 'Proposed')
                ->where('changeRequest.current.title', 'Old'));
    });

    it('filters by status', function () {
        $this->actingAs($this->checker)->post(route('admin.change-requests.reject', ChangeRequest::where('summary', 'Theirs')->firstOrFail()), ['reason' => 'No thanks']);

        $this->actingAs($this->checker)->get(route('admin.change-requests.index', ['status' => 'rejected']))
            ->assertInertia(fn ($page) => $page->has('changeRequests.data', 1)->where('changeRequests.data.0.summary', 'Theirs')->where('changeRequests.data.0.rejection_reason', 'No thanks'));
        $this->actingAs($this->checker)->get(route('admin.change-requests.index'))
            ->assertInertia(fn ($page) => $page->has('changeRequests.data', 1)->where('changeRequests.data.0.summary', 'Mine'));
        $this->actingAs($this->checker)->get(route('admin.change-requests.index', ['status' => 'all']))
            ->assertInertia(fn ($page) => $page->has('changeRequests.data', 2));
    });

    it('is closed to users who are neither maker nor checker', function () {
        $this->actingAs(User::factory()->create())->get(route('admin.change-requests.index'))->assertForbidden();
    });
});

describe('large files uploaded in chunks', function () {
    it('keep their upload while the change waits and are used when it is approved', function () {
        $uploadId = chunkedUpload($this->maker, 'downloads', 'big.pdf', pdfBytes(90));

        $this->actingAs($this->maker)->post(route('downloads.store'), [
            'title' => 'Big file', 'category' => 'Document', 'file_upload_id' => $uploadId,
        ])->assertRedirect(route('admin.change-requests.index'));

        $session = UploadSession::where('uuid', $uploadId)->firstOrFail();
        expect($session->consumed_at)->toBeNull();

        $this->travel(5)->days();
        app(ChunkedUploadService::class)->prune();
        Storage::disk('public')->assertExists($session->fresh()->final_path);

        $this->actingAs($this->checker)->post(route('admin.change-requests.approve', ChangeRequest::firstOrFail()))->assertSessionHas('success');

        $download = Download::firstOrFail();
        expect($download->file_size)->toBe(90)->and($download->created_by)->toBe($this->maker->id);
        Storage::disk('public')->assertExists($download->file_path);
        expect($session->fresh()->consumed_at)->not->toBeNull();
    });

    it('are cleaned up as usual once the change was rejected', function () {
        $uploadId = chunkedUpload($this->maker, 'downloads', 'big.pdf', pdfBytes(90));
        $this->actingAs($this->maker)->post(route('downloads.store'), ['title' => 'Big file', 'category' => 'Document', 'file_upload_id' => $uploadId]);
        $this->actingAs($this->checker)->post(route('admin.change-requests.reject', ChangeRequest::firstOrFail()), ['reason' => 'Not needed']);

        $this->travel(5)->days();
        app(ChunkedUploadService::class)->prune();

        expect(UploadSession::where('uuid', $uploadId)->firstOrFail()->final_path)->toBeNull();
    });
});

it('lists the maker and checker permissions and keeps super-admin a checker, not a maker', function () {
    expect($this->checker->can('approve changes'))->toBeTrue()
        ->and($this->checker->can('submit changes for approval'))->toBeFalse();
});

it('keeps the permission check in front of the approval hold on every guarded admin route', function () {
    $held = collect(Route::getRoutes()->getRoutes())->filter(fn ($route) => in_array('maker.checker', $route->gatherMiddleware(), true));

    expect($held->count())->toBeGreaterThan(40);

    foreach ($held as $route) {
        $middleware = array_values($route->gatherMiddleware());
        $permission = collect($middleware)->search(fn ($name) => is_string($name) && str_starts_with($name, 'permission:'));

        expect($permission)->not->toBeFalse("{$route->getName()} lost its permission check")
            ->and($permission)->toBeLessThan(array_search('maker.checker', $middleware, true));
    }
});
