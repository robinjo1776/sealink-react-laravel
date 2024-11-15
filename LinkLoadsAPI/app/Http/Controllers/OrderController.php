<?php

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

    public function index()
    {
        return $this->order->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->order->create($request->all());    }

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
        $order->update($request->all());
        return $order;
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
