<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class hasil_soal extends Model
{
    use HasFactory;


    protected $fillable  = ['*'];

    protected $table = 'db_hasil_soal';

    protected $primaryKey = 'id';

    public $timestamps = false;

    public $incrementing = false;



}
