<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('db_hasil_soal', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_user');
            $table->string('email');
            $table->string('nama_user');
            $table->string('score');
            $table->date('tgl_main');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
