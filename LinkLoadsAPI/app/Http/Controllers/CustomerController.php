<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    protected $customer;

    public function __construct()
    {
        $this->customer = new Customer();
    }

    /**
     * Get all customers.
     */
    public function index()
    {
        return response()->json($this->customer->all());
    }

    /**
     * Store a newly created customer.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'cust_name' => 'required|string|max:255',
        ]);


        $customer = $this->customer->create($request->all());
        return response()->json($customer, 201);  
    }

    /**
     * Display a specific customer.
     */
    public function show(string $id)
    {
        $customer = $this->customer->find($id);

        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);  // Return 404 if customer not found
        }

        return response()->json($customer);
    }

    /**
     * Update a specific customer.
     */
    public function update(Request $request, string $id)
    {
        $customer = $this->customer->find($id);

        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);  
        }

        // Update the customer data
        $customer->update($request->all());

        return response()->json($customer);  
    }

    /**
     * Delete a specific customer.
     */
    public function destroy(string $id)
    {
        $customer = $this->customer->find($id);

        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404); 
        }

        $customer->delete();  

        return response()->json(['message' => 'Customer deleted successfully']);
    }
}
