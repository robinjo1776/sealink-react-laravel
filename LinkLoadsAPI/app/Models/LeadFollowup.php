<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadFollowup extends Model
{
    use HasFactory;

    // Define the table name (optional)
    protected $table = 'lead_follow_up';

    // Primary key (if it's not 'id')
    protected $primaryKey = 'id';  // Assuming 'id' is your primary key in this table

    // Mass-assignable fields
    protected $fillable = [
        'lead_status',
        'next_follow_up_date',
        'remarks',
        'equipment',
        'products',
        'lead_no',
        'lead_date',
        'customer_name',
        'phone',
        'email',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'unit_no',
        'lead_type',
        'contact_person',
        'notes',
        'contacts',
    ];

    // Define the relationship to the Lead model
    public function lead()
    {
        return $this->belongsTo(Lead::class, 'lead_no'); // Ensure the foreign key matches the column in the database
    }
}
