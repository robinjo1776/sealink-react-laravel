<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    /**
     * Send emails to recipients dynamically based on module and IDs.
     */
    public function sendEmails(Request $request)
    {
        // Validate the incoming request
        $validatedData = Validator::make($request->all(), [
            'module' => 'required|string|in:carriers,customers',
            'ids' => 'required|array',
            'ids.*' => 'integer',
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validatedData->fails()) {
            return response()->json(['errors' => $validatedData->errors()], 422);
        }

        // Extract validated data
        $module = $request->module;
        $ids = $request->ids;

        // Dynamically determine the model and relationship
        $model = $this->getModelClass($module);
        $contacts = $this->getEmails($model, $ids);

        if ($contacts->isEmpty()) {
            return response()->json(['message' => "No emails found for selected {$module}"], 404);
        }

        // Send emails
        foreach ($contacts as $contact) {
            Mail::raw($request->content, function ($message) use ($contact, $request) {
                $message->to($contact->email)
                    ->subject($request->subject);
            });
        }

        return response()->json(['message' => "Emails sent successfully to {$module}"]);
    }

    /**
     * Get the model class based on the module name.
     */
    protected function getModelClass($module)
    {
        $models = [
            'carriers' => \App\Models\Carrier::class,
            'customers' => \App\Models\Customer::class,
        ];

        return $models[$module] ?? null;
    }

    /**
     * Fetch email contacts dynamically based on the model.
     */
    protected function getEmails($modelClass, $ids)
    {
        if (!$modelClass) {
            return collect(); // Return an empty collection if the model is invalid
        }

        // Assuming each model has a 'contacts' relationship
        return $modelClass::whereIn('id', $ids)
            ->with('contacts') // Ensure 'contacts' is a relationship in the model
            ->get()
            ->pluck('contacts') // Flatten contacts
            ->flatten()
            ->whereNotNull('email'); // Filter out any null emails
    }
}
