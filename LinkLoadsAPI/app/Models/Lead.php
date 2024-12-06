<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    // Define the table name (optional if your table name follows convention)
    protected $table = 'leads';

    // Primary key field
    protected $primaryKey = 'id';  // You can keep 'id' as primary key if you're using a standard auto-increment

    // Define the mass-assignable fields
    protected $fillable = [
        'lead_no',
        'lead_date',
        'follow_up_date',
        'customer_name',
        'phone',
        'email',
        'website',
        'equipment_type',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'unit_no',
        'lead_type',
        'contact_person',
        'lead_status',
        'notes',
        'contacts',
        'assigned_to'
    ];
    // Define the relationship to the LeadFollowup model
    public function leadFollowups()
    {
        return $this->hasMany(LeadFollowup::class, 'lead_no'); // Ensure this matches the foreign key
    }
}
