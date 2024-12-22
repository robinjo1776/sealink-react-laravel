<?php

// app/Http/Controllers/OrderController.php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $order;

    public function __construct()
    {
        $this->order = new Order();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->order->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $orderData = $request->all();

        // Handle `contacts` field to ensure it's correctly stored as JSON
        if (isset($orderData['origin_location']) && is_array($orderData['origin_location'])) {
            $orderData['origin_location'] = json_encode($orderData['origin_location']);
        }
        if (isset($orderData['destination_location']) && is_array($orderData['destination_location'])) {
            $orderData['destination_location'] = json_encode($orderData['destination_location']);
        }
        if (isset($orderData['charges']) && is_array($orderData['charges'])) {
            $orderData['charges'] = json_encode($orderData['charges']);
        }
        if (isset($leadData['discounts']) && is_array($orderData['discounts'])) {
            $orderData['discounts'] = json_encode($orderData['discounts']);
        }


        return $this->order->create($orderData);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->order->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Attempt to find the lead by its ID
        $order = $this->order->find($id);

        // If the lead is not found, return a 404 response with an error message
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        // Get the data to update from the request
        $orderData = $request->all();

        // Handle `contacts` field update if necessary
        if (isset($orderData['origin_location']) && is_array($orderData['origin_location'])) {
            $orderData['origin_location'] = json_encode($orderData['origin_location']);
        }
        if (isset($orderData['destination_location']) && is_array($orderData['destination_location'])) {
            $orderData['destination_location'] = json_encode($orderData['destination_location']);
        }
        if (isset($orderData['charges']) && is_array($orderData['charges'])) {
            $orderData['charges'] = json_encode($orderData['charges']);
        }
        if (isset($orderData['discounts']) && is_array($orderData['discounts'])) {
            $orderData['discounts'] = json_encode($orderData['discounts']);
        }

        // Perform the update
        $order->update($orderData);

        // Return the updated lead
        return response()->json($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = $this->order->find($id);
        return $order->delete();
    }
}
