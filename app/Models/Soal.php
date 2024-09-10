<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Soal extends Model
{
    
    use HasFactory;


    protected $fillable  = ['*'];

    protected $table = 'db_soal';

    protected $primaryKey = 'id';

    public $timestamps = false;

    public $incrementing = false;

}
