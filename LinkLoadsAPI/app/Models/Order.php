<?php

// app/Models/Order.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer', 'customer_ref_no', 'branch', 'booked_by', 'account_rep', 'sales_rep', 
        'customer_po_no', 'commodity', 'equipment', 'load_type', 'temperature', 'origin_location', 
        'destination_location', 'hot', 'team', 'air_ride', 'tarp', 'hazmat', 'currency', 
        'base_price', 'charges', 'discounts', 'gst', 'pst', 'hst', 'qst', 'final_price', 'notes'
    ];

    protected $casts = [
        'origin_location' => 'array',
        'destination_location' => 'array',
        'charges' => 'array',
        'discounts' => 'array',
    ];
}
