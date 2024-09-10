<?php

use App\Http\Controllers\UserAdminController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\UserUmumController;
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

Route::get('/AdminHome',function(){
    return view('Admin.index');
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

route::controller(UserUmumController::class)->group(function(){
        route::get('/gamesview','GamesView');
});


//user admin

route::controller(UserAdminController::class)->group(function(){
    route::get('/editpr_View','ViewEditPr');
    route::post('/UpdatedataAdmin','AdminUpdate');
    route::get('/games','GamesView');

});