<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class Rename1099ColumnInCarriersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Using raw SQL to rename the column
        DB::statement('ALTER TABLE carriers CHANGE COLUMN `1099` `form_1099` TINYINT(1) NOT NULL DEFAULT 0');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Revert back to original column name using raw SQL
        DB::statement('ALTER TABLE carriers CHANGE COLUMN `form_1099` `1099` TINYINT(1) NOT NULL DEFAULT 0');
    }
}
