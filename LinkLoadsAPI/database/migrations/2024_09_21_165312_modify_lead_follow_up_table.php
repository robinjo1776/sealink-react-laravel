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
        Schema::table('lead_follow_up', function (Blueprint $table) {
            $table->dropColumn(['product_name', 'quantity']);
            $table->longText('products')->nullable(); // Add new products field
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lead_follow_up', function (Blueprint $table) {
            $table->string('product_name'); // Add back product_name
            $table->integer('quantity'); // Add back quantity
            $table->dropColumn('products'); // Drop products field
        });
    }
};
