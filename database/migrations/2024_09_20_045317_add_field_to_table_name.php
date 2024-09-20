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
        Schema::table('db_soal', function (Blueprint $table) {
            //

            $table->string('Jawaban_A');
            $table->string('Jawaban_B');
            $table->string('Jawaban_C');
            $table->string('Jawaban_D');
            $table->string('JawabanBenar');
            
            
            
        });
    }
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('db_soal', function (Blueprint $table) {
            //
            $table->dropColumn('Jawaban_A');
            $table->dropColumn('Jawaban_B');
            $table->dropColumn('Jawaban_C');
            $table->dropColumn('Jawaban_D');
            $table->dropColumn('JawabanBenar');
            
        });
    }
};
