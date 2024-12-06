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
        Schema::table('customers', function (Blueprint $table) {
            // Change the data type of the 'cust_credit_application' column to boolean
            $table->boolean('cust_credit_application')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            // Revert the 'cust_credit_application' column back to its original type (nullable integer)
            $table->tinyInteger('cust_credit_application')->nullable()->change();
        });
    }
};
