<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateRoleColumnInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Change the existing role column
            $table->enum('role', ['user', 'admin', 'employee'])->default('user')->change();
        });
    }
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop the updated role column
            $table->dropColumn('role');
            // Restore the original role column
            $table->enum('role', ['user', 'admin'])->default('user');
        });
    }
}
