<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_orders_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // auto-incrementing ID
            $table->string('customer');
            $table->string('customer_ref_no');
            $table->string('branch');
            $table->string('booked_by');
            $table->string('account_rep');
            $table->string('sales_rep');
            $table->string('customer_po_no');
            $table->string('commodity');
            $table->string('equipment');
            $table->string('load_type');
            $table->string('temperature');
            $table->json('origin_location'); // JSON field for locations
            $table->json('destination_location'); // JSON field for locations
            $table->boolean('hot')->default(false);
            $table->boolean('team')->default(false);
            $table->boolean('air_ride')->default(false);
            $table->boolean('tarp')->default(false);
            $table->boolean('hazmat')->default(false);
            $table->string('currency');
            $table->decimal('base_price', 10, 2);
            $table->json('charges'); // JSON field for charges
            $table->json('discounts'); // JSON field for discounts
            $table->decimal('gst', 10, 2);
            $table->decimal('pst', 10, 2);
            $table->decimal('hst', 10, 2);
            $table->decimal('qst', 10, 2);
            $table->decimal('final_price', 10, 2);
            $table->text('notes')->nullable();
            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
