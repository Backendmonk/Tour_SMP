<?php

namespace App\Http\Controllers;

use App\Models\Soal;
use Illuminate\Http\Request;

class UserUmumController extends Controller
{
    //

    public function GamesView(){

        return view('UserUmum.GamesView');
        
    }


    public function GameStart(){


        $datagame = [

            'listSoal'=>Soal::all()
        ];

        return view('UserUmum.GameStart',$datagame);
    }


    public function SumbmitJawaban(Request $reqjawaban){

                $jawabanA = $reqjawaban->input('jawaban');


                /// bandingkan

    }
}
