<?php

use App\Http\Controllers\LoanCalculatorController;
use App\Mail\ContactSubmissionMail;
use Illuminate\Support\Facades\Mail;

it('does not call env() outside of config files so config:cache stays safe', function () {
    $offenders = [];

    foreach (['app', 'routes', 'database', 'resources/views'] as $directory) {
        $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(base_path($directory)));

        foreach ($iterator as $file) {
            if (! $file->isFile() || ! str_ends_with($file->getFilename(), '.php')) {
                continue;
            }

            if (preg_match('/(?<![\w>:])env\(/', file_get_contents($file->getPathname()))) {
                $offenders[] = str_replace(base_path().'/', '', $file->getPathname());
            }
        }
    }

    expect($offenders)->toBeEmpty();
});

it('shares loan and deposit rates from the bank config on every page', function () {
    config([
        'bank.loan_rates.personal' => 28.0,
        'bank.deposit_rates.savings' => 7.5,
    ]);

    $this->get(route('contact'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('bankRates.loan.personal', 28)
            ->where('bankRates.deposit.savings', 7.5));
});

it('shares footer and social links from the bank config', function () {
    config([
        'bank.social.facebook' => 'https://example.test/fb',
        'bank.footer.regulatory.sbp' => 'https://example.test/sbp',
    ]);

    $this->get(route('contact'))
        ->assertInertia(fn ($page) => $page
            ->where('socialLinks.facebook', 'https://example.test/fb')
            ->where('footerLinks.regulatory.sbp', 'https://example.test/sbp'));
});

it('sends contact form notifications to the configured recipient', function () {
    Mail::fake();
    config(['bank.contact.form_recipient' => 'desk@example.test']);

    $this->postJson(route('contact.submit'), [
        'name' => 'Config Tester',
        'email' => 'tester@example.test',
        'category' => 'general_inquiry',
        'subject' => 'Recipient check',
        'message' => 'Where does this go?',
    ])->assertOk();

    Mail::assertSent(ContactSubmissionMail::class, fn ($mail) => $mail->hasTo('desk@example.test'));
});

it('uses the configured limits and rate on the loan calculator page', function () {
    config([
        'bank.loan_limits.max_car' => 4200000,
        'bank.loan_rates.car' => 15.0,
    ]);

    $limits = (new ReflectionMethod(LoanCalculatorController::class, 'extractLoanLimits'))
        ->invoke(new LoanCalculatorController, 'Car Finance Scheme');

    expect($limits['max'])->toBe(4200000)
        ->and($limits['rate'])->toBe(15.0);
});
