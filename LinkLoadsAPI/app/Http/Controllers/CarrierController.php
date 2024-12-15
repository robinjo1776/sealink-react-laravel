<?php

namespace App\Http\Controllers;

use App\Models\Carrier;
use Illuminate\Http\Request;

class CarrierController extends Controller
{
    /**
     * Display a listing of the carriers.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $carriers = Carrier::all();
        return response()->json($carriers);
    }

    /**
     * Store a newly created carrier in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validation (You can adjust as needed)
        $validated = $request->validate([
            'dba' => 'required|string',
            'legal_name' => 'nullable|string',
            'remit_name' => 'nullable|string',
            'acc_no' => 'nullable|string',
            'branch' => 'nullable|string',
            'website' => 'nullable|url',
            'fed_id_no' => 'nullable|string',
            'pref_curr' => 'nullable|string',
            'pay_terms' => 'nullable|string',
            'form_1099' => 'nullable|boolean',
            'advertise' => 'nullable|boolean',
            'advertise_email' => 'nullable|email',
            'carr_type' => 'nullable|string',
            'rating' => 'nullable|string',
            'brok_carr_aggmt' => 'nullable|url',
            'dot_number' => 'nullable|string',
            'wcb_no' => 'nullable|string',
            'ca_bond_no' => 'nullable|string',
            'us_bond_no' => 'nullable|string',
            'scac' => 'nullable|string',
            'csa_approved' => 'nullable|boolean',
            'hazmat' => 'nullable|boolean',
            'smsc_code' => 'nullable|string',
            'approved' => 'nullable|boolean',
            'li_provider' => 'nullable|string',
            'li_policy_no' => 'nullable|string',
            'li_coverage' => 'nullable|string',
            'li_start_date' => 'nullable|date',
            'li_end_date' => 'nullable|date',
            'ci_provider' => 'nullable|string',
            'ci_policy_no' => 'nullable|string',
            'ci_coverage' => 'nullable|string',
            'ci_start_date' => 'nullable|date',
            'ci_end_date' => 'nullable|date',
            'coi_cert' => 'nullable|url',
            'primary_address' => 'nullable|string',
            'primary_city' => 'nullable|string',
            'primary_state' => 'nullable|string',
            'primary_country' => 'nullable|string',
            'primary_postal' => 'nullable|string',
            'primary_phone' => 'nullable|string',
            'mailing_address' => 'nullable|string',
            'mailing_city' => 'nullable|string',
            'mailing_state' => 'nullable|string',
            'mailing_country' => 'nullable|string',
            'mailing_postal' => 'nullable|string',
            'mailing_phone' => 'nullable|string',
        ]);



        // Handle file upload if URLs aren't provided (you may skip this if using URLs directly)
        if ($request->hasFile('coi_cert')) {
            $validated['coi_cert'] = $request->file('coi_cert')->store('documents/coi_cert');
        }

        if ($request->hasFile('brok_carr_aggmt')) {
            $validated['brok_carr_aggmt'] = $request->file('brok_carr_aggmt')->store('documents/brok_carr_aggmt');
        }

        // Create the carrier with the validated data
        $carrier = Carrier::create($validated);

        return response()->json(['message' => 'Carrier created successfully!', 'carrier' => $carrier], 201);
    }


    /**
     * Display the specified carrier.
     *
     * @param  \App\Models\Carrier  $carrier
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Carrier $carrier)
    {
        return response()->json($carrier);
    }

    /**
     * Update the specified carrier in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Carrier  $carrier
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Carrier $carrier)
    {
        // Validate incoming data (you can add more validations as needed)
        $validated = $request->validate([
            'dba' => 'string|nullable',
            'legal_name' => 'string|nullable',
            'contact' => 'nullable|json', // Ensure the 'contact' field is a valid JSON string
            'equipment' => 'nullable|json', // Same for 'equipment'
            'lane' => 'nullable|json', // Same for 'lane'
            // Add other fields as necessary
        ]);

        // Handle file uploads if they exist
        if ($request->hasFile('coi_cert')) {
            $validated['coi_cert'] = $request->file('coi_cert')->store('documents/coi_cert');
        }

        if ($request->hasFile('brok_carr_aggmt')) {
            $validated['brok_carr_aggmt'] = $request->file('brok_carr_aggmt')->store('documents/brok_carr_aggmt');
        }

        // Update the carrier with the validated and processed data
        $carrier->update($validated);

        return response()->json($carrier);
    }

    /**
     * Remove the specified carrier from storage.
     *
     * @param  \App\Models\Carrier  $carrier
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Carrier $carrier)
    {
        $carrier->delete();

        return response()->json(['message' => 'Carrier deleted successfully.']);
    }
}
