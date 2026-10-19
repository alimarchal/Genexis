<?php

use App\Models\Branch;
use App\Models\District;
use App\Models\Division;
use App\Models\Region;

describe('contact page branch locations', function () {
    it('lists active branches with coordinates for the map', function () {
        $region = Region::factory()->create(['division_id' => Division::factory()->create()->id, 'name' => 'Kotli', 'status' => 'active']);
        $district = District::factory()->create(['region_id' => $region->id]);
        $mapped = Branch::factory()->create(['region_id' => $region->id, 'district_id' => $district->id, 'status' => 'active', 'latitude' => 33.5, 'longitude' => 73.9]);
        Branch::factory()->create(['region_id' => $region->id, 'district_id' => $district->id, 'status' => 'active', 'latitude' => null, 'longitude' => null]);
        Branch::factory()->create(['region_id' => $region->id, 'district_id' => $district->id, 'status' => 'inactive', 'latitude' => 33.6, 'longitude' => 73.8]);

        $this->get(route('contact'))->assertOk()->assertInertia(fn ($page) => $page
            ->component('Contact/Index')
            ->has('branchLocations', 1)
            ->where('branchLocations.0.id', $mapped->id)
            ->where('branchLocations.0.region', 'Kotli')
            ->where('branchLocations.0.latitude', 33.5)
            ->where('branchLocations.0.google_maps_url', 'https://www.google.com/maps?q=33.50000000,73.90000000'));
    });

    it('still renders when no branch has coordinates', function () {
        $this->get(route('contact'))->assertOk()->assertInertia(fn ($page) => $page->has('branchLocations', 0));
    });
});

describe('organogram page', function () {
    it('passes divisions, regions and branch counts to the page', function () {
        $division = Division::factory()->create(['short_name' => 'CRBD', 'is_active' => true]);
        $region = Region::factory()->create(['division_id' => $division->id, 'name' => 'Mirpur', 'status' => 'active']);
        $district = District::factory()->create(['region_id' => $region->id]);
        Branch::factory()->count(2)->create(['region_id' => $region->id, 'district_id' => $district->id]);

        $this->get(route('about.organogram'))->assertOk()->assertInertia(fn ($page) => $page
            ->component('About/Organogram')
            ->has('divisions', 1)
            ->has('regions', 1)
            ->where('regionBranchCounts.Mirpur', 2));
    });

    it('renders with empty data instead of failing', function () {
        $this->get(route('about.organogram'))->assertOk()->assertInertia(fn ($page) => $page->has('divisions', 0)->has('regions', 0));
    });
});
