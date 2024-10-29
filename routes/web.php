<?php

use App\Http\Controllers\UserAdminController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\UserUmumController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login',function(){
    return view('Login');
});

Route::get('/loginadmin',function(){
    return view('LoginAdmin');
});

Route::get('/TourSekolah',function(){
    return view('UserUmum.Tour');
});



//user controller untuk CRUD USER
Route::controller(UsersController::class)->group(function(){
    route::post('/LogAdmin','LoginUserAdm');
    route::post('/LogUmum','LoginUserUmum');
    route::get('/daftaradmin','daftarAdmin');
    route::get('/daftaruserUm','daftaruserUmum');
    route::get('/logout','Logout');
    route::Post('/addAdmin','TambahAdmin');
    route::Post('/adduserumum','TambahuserUM');
 
  

});


//user umum 

route::controller(UserUmumController::class)->middleware('userakses:Umum')->group(function(){
        route::get('/gamesview','GamesView');
        route::get('/gamestart','GameStart');
        route::post('/sumbitJawaban','SumbmitJawaban');
        route::get('/HasilSoal','HasilScoreRekap');
});


//user admin


//route group -> middleware (akses:Jabatan) -> group Fungsi
route::controller(UserAdminController::class)->middleware('Aksesadmin:Admin')->group(function(){
    route::get('/editpr_View','ViewEditPr');
    route::get('/AdminHome','AdminHome');
    route::post('/UpdatedataAdmin','AdminUpdate');
    route::get('/games','GamesView');
    route::get('/readingAdd','readingView');
    route::get('/readingAdd','TambahSoalMembaca');
    route::post('/readingsoalAdd','readingadd');  
    route::get('/listeningAdd','listeningview');  
    route::post('/listeningsoalAdd','listeningadd');
    route::post('/hapusSoal','DeleteSoal');
});

