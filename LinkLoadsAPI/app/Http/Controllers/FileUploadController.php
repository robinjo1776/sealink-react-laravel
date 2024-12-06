<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    public function uploadFile(Request $request)
    {
        // Validate the uploaded file
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf,docx|max:10240',
        ]);
    
        // Check if a file is uploaded
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
    
            // Store the file in the "uploads" directory
            $filePath = $request->file('file')->store('uploads', 'public'); // Save in public disk
    
            // Print the full URL for debugging purposes
            $fullUrl = url(Storage::url($filePath));
            Log::info('File URL: ' . $fullUrl);  // This will log the URL to your Laravel log
    
            // Return the full URL
            return response()->json([
                'fileUrl' => $fullUrl, // Full URL
            ]);
        }
    
        return response()->json(['error' => 'File upload failed'], 400);
    }
    
    
}
