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
     * Store newly created resources in storage (bulk insert).
     */
    public function store(Request $request)
    {
        $orderData = $request->all();

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
        $order = $this->order->find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $orderData = $request->all();


        $order->update($orderData);

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
