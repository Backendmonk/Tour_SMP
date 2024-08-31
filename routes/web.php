<?php

use App\Http\Controllers\UsersController;
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

//user controller untuk CRUD USER
Route::controller(UsersController::class)->group(function(){
    route::post('/LogAdmin','LoginUser');
    route::get('/daftaradmin','daftarAdmin');

});
