<?php

namespace App\Http\Controllers;

use App\Models\hasil_soal;
use App\Models\Soal;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserUmumController extends Controller
{
    //

    public function GamesView(){

        return view('UserUmum.GamesView');
        
    }


    public function GameStart(){


        $datagame = [

            'listSoal'=>Soal::inRandomOrder()->get()
            //inRandomOrder()->limit(3)->get()
        ];

        return view('UserUmum.GameStart',$datagame);
    }


    public function SumbmitJawaban(Request $reqjawaban){

                    //array dipanggil dengan perintah input->('nama array')
                $jawaban = $reqjawaban->input('jawaban');
              
                $jumlahbenar  = 0;
                $jumlahsoal = count($jawaban);
                
                    //cari id soal dari array dimana jawabanA adalah variable yang membawa array dan disini array akan dipisahkan dari indexnya $id sebagai index => $terpilih menjadi varibale untuk isi

                    //contoh pada array ada 1=>'9' maka id adalah 1 dan terpilih adalah 9
                    //untuk memudahkan pengecekan dan pembandingan

                    //DIGUNAKAN KETIKA INPUT YANG DITERIMA BERIPA ARRAY
              foreach ($jawaban as $id => $jawaban_terpilih) {
                $soal = Soal::find($id);
                
                //cek apakah jawaban ayng dipilih sama dengan jawaban yang benar tergantung dari id yang dibawa
                if ($soal && $jawaban_terpilih == $soal->JawabanBenar) {
                    # code...
                    
                    $jumlahbenar++;
                }

            
              }

              $total = ($jumlahbenar/$jumlahsoal)*100;
              $hasilAkhir = floor($total);

                ///up to hasil

                    $id = Auth::user()->id;
                    $email = Auth::user()->email;
                    $nama = Auth::user()->name;
                    $tanggal = Carbon::now();



                    try {
                        //code...

                        $pushTo_HasilSoal = new hasil_soal;
                        

                        $pushTo_HasilSoal->id_user = $id;
                        $pushTo_HasilSoal->email = $email;
                        $pushTo_HasilSoal->nama_user = $nama;
                        $pushTo_HasilSoal->score = $hasilAkhir;
                        $pushTo_HasilSoal->tgl_main =$tanggal;


                        $pushTo_HasilSoal->save();


                       


                    } catch (\Throwable $th) {
                        //throw $th;
                    }
                        
                    
                    

            

             
                /// bandingkan

    }
}
