<?php

namespace App\Providers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\ServiceProvider;

class UserTrackingServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Blueprint::macro('userTracking', function () {
            $this->foreignId('created_by')->nullable()->constrained('users', 'id');
            $this->foreignId('updated_by')->nullable()->constrained('users', 'id');

            return $this; // Enables method chaining
        });
    }
}
