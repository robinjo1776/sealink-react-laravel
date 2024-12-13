<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user and return the token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users,username',  // Ensure the username is unique
            'email' => 'required|email|unique:users,email',  // You might still want the email to be unique
            'password' => 'required|string|min:8|confirmed',  // Make sure password_confirmation is included in the request
            'role' => 'required|string',
            'emp_code' => 'required|string',
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email, // Optional, but good for account recovery or notifications
            'password' => Hash::make($request->password),  // Hash the password before saving
            'role' => $request->role,
            'emp_code' => $request->emp_code,
        ]);

        // Generate and return the API token
        return response()->json([
            'token' => $user->createToken('API Token')->plainTextToken,
        ]);
    }


    /**
     * Log the user in and return the token.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($request->only('username', 'password'))) {
            $user = Auth::user();
            return response()->json([
                'token' => $user->createToken('API Token')->plainTextToken,
                'user' => $user
            ]);
        }

        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    /**
     * Logout the user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json(['message' => 'Logged out successfully']);
    }
}
