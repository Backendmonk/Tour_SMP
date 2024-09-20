<?php

namespace App\Http\Controllers;

use App\Models\Soal;
use App\Models\User;
use Illuminate\Http\Request;

class UserAdminController extends Controller
{
    //


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

}
