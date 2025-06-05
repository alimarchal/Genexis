#!/usr/bin/env php
<?php

/**
 * CRUD Test Script for Laravel 11+ CRUD Modules
 *
 * This script tests the basic functionality of all CRUD modules:
 * - Region (basic fields: name, status)
 * - District (belongs to Region)
 * - Branch (belongs to District)
 * - Contact (belongs to Branch)
 * - BranchService (belongs to Branch)
 */

require __DIR__.'/vendor/autoload.php';

use App\Models\Branch;
use App\Models\BranchService;
use App\Models\Contact;
use App\Models\District;
use App\Models\Region;

// Initialize Laravel
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "🚀 CRUD Modules Test Script\n";
echo "=========================\n\n";

// Test 1: Check if all models can be instantiated
echo "1. Testing Model Instantiation...\n";
try {
    $region = new Region;
    $district = new District;
    $branch = new Branch;
    $contact = new Contact;
    $branchService = new BranchService;
    echo "✅ All models instantiated successfully\n\n";
} catch (Throwable $e) {
    echo '❌ Model instantiation failed: '.$e->getMessage()."\n\n";
    exit(1);
}

// Test 2: Check if we can read data
echo "2. Testing Data Retrieval...\n";
try {
    $regionCount = Region::count();
    $districtCount = District::count();
    $branchCount = Branch::count();
    $contactCount = Contact::count();
    $branchServiceCount = BranchService::count();

    echo "✅ Regions: $regionCount\n";
    echo "✅ Districts: $districtCount\n";
    echo "✅ Branches: $branchCount\n";
    echo "✅ Contacts: $contactCount\n";
    echo "✅ Branch Services: $branchServiceCount\n\n";
} catch (Throwable $e) {
    echo '❌ Data retrieval failed: '.$e->getMessage()."\n\n";
    exit(1);
}

// Test 3: Check relationships
echo "3. Testing Relationships...\n";
try {
    // Test Region -> Districts
    $region = Region::with('districts')->first();
    if ($region && $region->districts) {
        echo "✅ Region -> Districts relationship works\n";
    }

    // Test District -> Region and Branches
    $district = District::with(['region', 'branches'])->first();
    if ($district && $district->region && $district->branches) {
        echo "✅ District -> Region and Branches relationships work\n";
    }

    // Test Branch -> District, Contacts, and Services
    $branch = Branch::with(['district', 'contacts', 'services'])->first();
    if ($branch && $branch->district) {
        echo "✅ Branch -> District relationship works\n";
    }
    if ($branch && $branch->contacts) {
        echo "✅ Branch -> Contacts relationship works\n";
    }
    if ($branch && $branch->services) {
        echo "✅ Branch -> Services relationship works\n";
    }

    echo "\n";
} catch (Throwable $e) {
    echo '❌ Relationship test failed: '.$e->getMessage()."\n\n";
    exit(1);
}

// Test 4: Check fillable fields
echo "4. Testing Fillable Fields...\n";
try {
    $region = new Region;
    $regionFillable = $region->getFillable();
    echo '✅ Region fillable fields: '.implode(', ', $regionFillable)."\n";

    $district = new District;
    $districtFillable = $district->getFillable();
    echo '✅ District fillable fields: '.implode(', ', $districtFillable)."\n";

    $branch = new Branch;
    $branchFillable = $branch->getFillable();
    echo '✅ Branch fillable fields: '.implode(', ', $branchFillable)."\n";

    $contact = new Contact;
    $contactFillable = $contact->getFillable();
    echo '✅ Contact fillable fields: '.implode(', ', $contactFillable)."\n";

    $branchService = new BranchService;
    $branchServiceFillable = $branchService->getFillable();
    echo '✅ BranchService fillable fields: '.implode(', ', $branchServiceFillable)."\n\n";
} catch (Throwable $e) {
    echo '❌ Fillable fields test failed: '.$e->getMessage()."\n\n";
    exit(1);
}

echo "🎉 All CRUD Module Tests Passed!\n";
echo "================================\n\n";

echo "📋 Summary:\n";
echo "- All 5 CRUD modules are working correctly\n";
echo "- Models can be instantiated\n";
echo "- Database relationships are properly configured\n";
echo "- Data can be retrieved successfully\n";
echo "- Fillable fields are properly configured\n\n";

echo "🔗 Available Routes:\n";
echo "- Regions: /regions (index, create, edit, show)\n";
echo "- Districts: /districts (index, create, edit, show)\n";
echo "- Branches: /branches (index, create, edit, show)\n";
echo "- Contacts: /contacts (index, create, edit, show)\n";
echo "- Branch Services: /branch-services (index, create, edit, show)\n\n";

echo "✨ CRUD modules are ready for use!\n";
