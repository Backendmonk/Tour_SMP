<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Expr\New_;

class UsersController extends Controller
{
    function LoginUserAdm(Request $reqInput){

        $reqInput->validate([
            'email'=>'required',
            'password'=>'required'
        ],
            //apakah password dan username kosong?
            [
                'email.required'=>'Email Tidak Boleh Kosong',
                'password.required'=>'Password Tidak Boleh kosong'
            ]
    );


    $infLog = [

        'email'=>$reqInput->email,
        'password'=>$reqInput->password
    ];

    if (Auth::attempt($infLog)) {
        if (Auth::user()->role=='Admin') {
            
            return redirect('/AdminHome');
        } else{
            return redirect('/loginadmin')->with('error','Akun Tidak Ada');
        }
    }else {
        return redirect('/loginadmin')->with('error','Akun Tidak Ada');
    }

    }



    function LoginUserUmum(Request $reqInput){

        $reqInput->validate([
            'email'=>'required',
            'password'=>'required'
        ],
            //apakah password dan username kosong?
            [
                'email.required'=>'Email Tidak Boleh Kosong',
                'password.required'=>'Password Tidak Boleh kosong'
            ]
    );


    $infLog = [

        'email'=>$reqInput->email,
        'password'=>$reqInput->password
    ];

    if (Auth::attempt($infLog)) {
        if (Auth::user()->role=='Umum') {
            
            return redirect('/');
        }   else{
            return redirect('/login')->with('error','Akun Tidak Ada');
        }
    }else {
        return redirect('/login')->with('error','Akun Tidak Ada');
    }

    }


    public function daftarAdmin(){

        return view('DaftarAdmin');
    }

    public function  daftaruserUmum(){

        return view('DaftarUmum');
    }

 


    public function TambahAdmin(Request $reqinputUser){

        $nama = $reqinputUser->name;
        $email = $reqinputUser->email;
        $password = $reqinputUser->password;
        $role = $reqinputUser->role;

            try {
                $inputAdmin = New User;

                $inputAdmin->name = $nama;
                $inputAdmin->email = $email;
                $inputAdmin->password = bcrypt($password);
                $inputAdmin->role = $role;


                $inputAdmin->save();
                return redirect('/loginadmin')->with('suksesdaftar',""); //buat alert

            } catch (\Throwable $th) {
               Echo "Error"; // buat alert
            }
    }
   

    
    public function  TambahuserUM(Request $reqinputUserUM){

        $nama = $reqinputUserUM->name;
        $email = $reqinputUserUM->email;
        $password = $reqinputUserUM->password;
        $role = $reqinputUserUM->role;

            try {
                $inputAdmin = New User;

                $inputAdmin->name = $nama;
                $inputAdmin->email = $email;
                $inputAdmin->password = bcrypt($password);
                $inputAdmin->role = $role;


                $inputAdmin->save();
                return redirect('/login')->with('suksesdaftar',""); //buat alert

            } catch (\Throwable $th) {
               Echo "Error"; // buat alert
            }
    }





    public function Logout(){

        Auth::logout();
        return redirect('/');
    }
}
