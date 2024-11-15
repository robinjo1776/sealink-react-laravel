<?php

namespace App\Providers;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    public function getData()
    {
        // Check if data is already cached
        $data = Cache::get('key');

        if (!$data) {
            // Simulate data retrieval (e.g., from a database)
            $data = 'fetched data'; // Replace with actual data source

            // Store data in cache
            Cache::put('key', $data, now()->addMinutes(10));
        }

        return $data;
    }
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
