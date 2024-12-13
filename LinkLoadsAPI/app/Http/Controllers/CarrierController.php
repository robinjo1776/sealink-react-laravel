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
        $validated = $request->validate([
            'dba' => 'string|nullable',
            'legal_name' => 'string|nullable',
            'remit_name' => 'string|nullable',
            'acc_no' => 'string|nullable',
            'branch' => 'string|nullable',
            'website' => 'string|nullable',
            'fed_id_no' => 'string|nullable',
            'pref_curr' => 'string|nullable|max:10',
            'pay_terms' => 'string|nullable',
            '1099' => 'boolean|nullable',
            'advertise' => 'boolean|nullable',
            'advertise_email' => 'email|nullable',
            'carr_type' => 'string|nullable',
            'rating' => 'string|nullable',
            'brok_carr_aggmt' => 'file|mimes:pdf,jpg,png|max:2048|nullable',
            'docket_no' => 'string|nullable',
            'dot_number' => 'string|nullable',
            'wcb_no' => 'string|nullable',
            'ca_bond_no' => 'string|nullable',
            'us_bond_no' => 'string|nullable',
            'scac' => 'string|nullable',
            'csa_approved' => 'boolean|nullable',
            'hazmat' => 'boolean|nullable',
            'smsc_code' => 'string|nullable',
            'approved' => 'boolean|nullable',
            'li_provider' => 'string|nullable',
            'li_policy_no' => 'string|nullable',
            'li_coverage' => 'numeric|nullable',
            'li_start_date' => 'date|nullable',
            'li_end_date' => 'date|nullable',
            'ci_provider' => 'string|nullable',
            'ci_policy_no' => 'string|nullable',
            'ci_coverage' => 'numeric|nullable',
            'ci_start_date' => 'date|nullable',
            'ci_end_date' => 'date|nullable',
            'coi_cert' => 'file|mimes:pdf,jpg,png|max:2048|nullable',
            'primary_address' => 'string|nullable',
            'primary_city' => 'string|nullable',
            'primary_state' => 'string|nullable',
            'primary_country' => 'string|nullable',
            'primary_postal' => 'string|nullable',
            'primary_phone' => 'string|nullable',
            'mailing_address' => 'string|nullable',
            'mailing_city' => 'string|nullable',
            'mailing_state' => 'string|nullable',
            'mailing_country' => 'string|nullable',
            'mailing_postal' => 'string|nullable',
            'mailing_phone' => 'string|nullable',
            'int_notes' => 'string|nullable',
            'contact' => 'array|nullable',
            'equipment' => 'array|nullable',
            'lane' => 'array|nullable',
        ]);

        // Handle file uploads
        if ($request->hasFile('coi_cert')) {
            $validated['coi_cert'] = $request->file('coi_cert')->store('documents/coi_cert');
        }

        if ($request->hasFile('brok_carr_aggmt')) {
            $validated['brok_carr_aggmt'] = $request->file('brok_carr_aggmt')->store('documents/brok_carr_aggmt');
        }

        $carrier = Carrier::create($validated);

        return response()->json($carrier, 201);
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
        $validated = $request->validate([
            'dba' => 'string|nullable',
            'legal_name' => 'string|nullable',
            // Repeat the same validation as in the store method...
        ]);

        // Handle file uploads
        if ($request->hasFile('coi_cert')) {
            $validated['coi_cert'] = $request->file('coi_cert')->store('documents/coi_cert');
        }

        if ($request->hasFile('brok_carr_aggmt')) {
            $validated['brok_carr_aggmt'] = $request->file('brok_carr_aggmt')->store('documents/brok_carr_aggmt');
        }

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
