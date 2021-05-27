<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldKeteranganToAbsentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('absents', function (Blueprint $table) {
            $table->boolean('keterangan')->default(2)->comment('0: Masuk, 1: Telat, 2: Alpha')->after('time_out');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('absents', function (Blueprint $table) {
            $table->dropColumn('keterangan');
        });
    }
}
