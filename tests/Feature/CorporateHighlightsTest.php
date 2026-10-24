<?php

it('shows the Corporate Highlights on the home page with the shared branch count', function () {
    config(['bank.stats.branches_count' => 91]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Welcome')
            ->where('corporateHighlights.0.value', '91')
            ->where('corporateHighlights.0.label', 'Locations across Azad Jammu & Kashmir')
            ->has('corporateHighlights', 5));
});

it('lets the configured highlights be changed without touching code', function () {
    config(['bank.highlights' => [['value' => '99', 'label' => 'Custom item']]]);

    $this->get(route('home'))
        ->assertInertia(fn ($page) => $page->has('corporateHighlights', 2)->where('corporateHighlights.1.label', 'Custom item'));
});

it('renders the highlights component on the home page', function () {
    expect(file_get_contents(resource_path('js/Pages/Welcome.tsx')))->toContain('<CorporateHighlights highlights={corporateHighlights} />');
});
