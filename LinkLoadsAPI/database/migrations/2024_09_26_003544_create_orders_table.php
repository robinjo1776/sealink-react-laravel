<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('customer');
            $table->string('customer_ref_no')->nullable();
            $table->string('branch')->nullable();
            $table->string('booked_by')->nullable();
            $table->string('account_rep')->nullable();
            $table->string('sales_rep')->nullable();
            $table->string('customer_po_no')->nullable();
            $table->string('shipment')->nullable();
            $table->string('commodity')->nullable();
            $table->string('equipment');
            $table->string('load_type');
            $table->string('temperature')->nullable();
            $table->string('origin_street')->nullable();
            $table->string('origin_city')->nullable();
            $table->string('origin_state')->nullable();
            $table->string('origin_country')->nullable();
            $table->date('pickup_date')->nullable();
            $table->time('pickup_time')->nullable();
            $table->string('pickup_po')->nullable();
            $table->string('origin_postal_code')->nullable();
            $table->string('origin_phone')->nullable();
            $table->text('shipper_notes')->nullable();
            $table->integer('origin_packages')->nullable();
            $table->decimal('origin_weight', 10, 2)->nullable();
            $table->string('origin_dimensions')->nullable();
            $table->string('destination_street')->nullable();
            $table->string('destination_city')->nullable();
            $table->string('destination_state')->nullable();
            $table->string('destination_country')->nullable();
            $table->date('delivery_date')->nullable();
            $table->time('delivery_time')->nullable();
            $table->string('delivery_po')->nullable();
            $table->string('destination_postal_code')->nullable();
            $table->string('destination_phone')->nullable();
            $table->text('delivery_notes')->nullable();
            $table->integer('destination_packages')->nullable();
            $table->decimal('destination_weight', 10, 2)->nullable();
            $table->string('destination_dimensions')->nullable();
            $table->json('special_instructions')->nullable();
            $table->string('currency')->nullable();
            $table->decimal('base_price', 10, 2)->nullable();
            $table->json('charges')->nullable(); // JSON to store charges
            $table->json('discounts')->nullable(); // JSON to store discounts
            $table->decimal('gst', 10, 2)->nullable();
            $table->decimal('pst', 10, 2)->nullable();
            $table->decimal('hst', 10, 2)->nullable();
            $table->decimal('qst', 10, 2)->nullable();
            $table->decimal('final_price', 10, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
