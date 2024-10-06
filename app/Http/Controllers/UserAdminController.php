<?php

namespace App\Http\Controllers;

use App\Models\Soal;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserAdminController extends Controller
{
    //


    public function AdminHome(){

        return view('Admin.index');
    }

    public function ViewEditPr()
    {

        return view('Admin.EditProfil');

    }


    public function GamesView(){

            $dataGames = [

                'DataSoal' => Soal::all(),
                'JmlSoalLS'=>Soal::where('jenis_soal','=','listening')->count('id'),
                'JmlSoalRD'=>Soal::where('jenis_soal','=','reading')->count('id'),

            ];

        return view('Admin.Games', $dataGames);
    }


    public function AdminUpdate(Request $reqInputUP){

        $nama = $reqInputUP->nama;
        $email = $reqInputUP->email;
        $id = $reqInputUP->id;
        
 
        try {
            $PushAdminUPToDB = User::find($id);

            $PushAdminUPToDB->name = $nama;
            $PushAdminUPToDB->email = $email;

            $PushAdminUPToDB->save();
            return redirect('editpr_View')->with('berhasil',"");
            
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    public function TambahSoalMembaca(){

        return view('Admin.ReadingAdd');
    }



    public function readingadd(Request $reqdatasoal){

        $soal = $reqdatasoal->soal;
        $jenissoal = $reqdatasoal->jenis_soal;
        $jbA = $reqdatasoal->jbA;
        $jbB= $reqdatasoal->jbB;
        $jbC= $reqdatasoal->jbC;
        $jbD= $reqdatasoal->jbD;

        $jbtr = $reqdatasoal->jbTr;
        $file = NULL;


        try {
            
            $addSoal = new Soal;

            $addSoal ->soal = $soal;
            $addSoal ->jenis_soal = $jenissoal;
            $addSoal ->file = $file;
            $addSoal->Jawaban_A = $jbA;
            $addSoal->Jawaban_B = $jbB;
            $addSoal->Jawaban_C = $jbC;
            $addSoal->Jawaban_D = $jbD;
            $addSoal->JawabanBenar =$jbtr;


            $addSoal->save();
            
            return redirect('games')->with('berhasil',"");
            



        } catch (\Throwable $th) {
            //throw $th;
        }
    }


    public function listeningview(){

        return view('Admin.ListeningAdd');
    }


    public function listeningadd(Request $reqlistening){

        //tambah ke table untuk halaman pathnya
        

        $reqlistening->validate([

                'audio'=>'required|mimes:mp3,wav,ogg|max:10240',
        ]);

        if ($reqlistening->file('audio')) {
            # code...
        }


    }

}
