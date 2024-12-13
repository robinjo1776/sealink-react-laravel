<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $primaryKey = 'id';

    protected $fillable = [
        'customer',
        'customer_ref_no',
        'branch',
        'booked_by',
        'account_rep',
        'sales_rep',
        'customer_po_no',
        'shipment',
        'commodity',
        'equipment',
        'load_type',
        'temperature',
        'origin_street',
        'origin_city',
        'origin_state',
        'origin_country',
        'pickup_date',
        'pickup_time',
        'pickup_po',
        'origin_postal_code',
        'origin_phone',
        'shipper_notes',
        'origin_packages',
        'origin_weight',
        'origin_dimensions',
        'destination_street',
        'destination_city',
        'destination_state',
        'destination_country',
        'delivery_date',
        'delivery_time',
        'delivery_po',
        'destination_postal_code',
        'destination_phone',
        'delivery_notes',
        'destination_packages',
        'destination_weight',
        'destination_dimensions',
        'special_instructions',
        'currency',
        'base_price',
        'charges',
        'discounts',
        'gst',
        'pst',
        'hst',
        'qst',
        'final_price',
        'notes',
    ];

    protected $casts = [
        'special_instructions' => 'array',
        'charges' => 'array',
        'discounts' => 'array',
    ];
    
    use HasFactory;
}
