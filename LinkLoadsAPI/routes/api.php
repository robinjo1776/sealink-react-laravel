<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LeadFollowupController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\EmployeeController;

// Public routes (no authentication required)
Route::post('/register', [AuthController::class, 'register']); // Register route
Route::post('/login', [AuthController::class, 'login'])->name('login'); // Login route (POST only)

// Authenticated routes (must be logged in with Sanctum token)
Route::middleware('auth:sanctum')->group(function () {
    // Logout route
    Route::post('/logout', [AuthController::class, 'logout']);

    // Routes for managing users (admin only, you can tweak this according to your roles)
    Route::get('/users', [UserController::class, 'index']); // Get all users
    Route::get('/users/{id}', [UserController::class, 'show']); // Get user by ID
    Route::put('/users/{id}', [UserController::class, 'update']); // Update user by ID
    Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete user by ID

    // CRUD operations for Leads
    Route::apiResource('/lead', LeadController::class);

    // CRUD operations for Lead Follow-ups
    Route::apiResource('/lead-followup', LeadFollowupController::class);

    // Fetch Lead Followups for logged-in employee
    Route::get('/employee', [EmployeeController::class, 'index']);

    // CRUD operations for Customers
    Route::apiResource('/customer', CustomerController::class);

    // CRUD operations for Orders
    Route::apiResource('/order', OrderController::class);
});
