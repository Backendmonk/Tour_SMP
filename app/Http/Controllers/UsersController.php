<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    function LoginUser(Request $reqInput){

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
            echo "Hallo Admin";
        }elseif (Auth::user()->role=='Umum') {
            return redirect('/');
        }
    }else {
        echo "username password salah";
    }

    }


    public function daftarAdmin(){

        return view('DaftarAdmin');
    }
}
