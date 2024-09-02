@extends('layout.main')

@section('judul')
    Login
@endsection
@section('isi')
<h1><center>Login Admin</center></h1>
<br>
<form method="POST" action="/adduserumum">
  @csrf

  <div class="form-group">
    <label for="exampleInputEmail1">Nama</label>
    <input type="text" required class="form-control" name = "name" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email"  required class="form-control" name = "email" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" required name = "password" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Role</label>
        <input type="text" required readonly name = "role" Value="Umum" class="form-control" id="exampleInputPassword1">
      </div>
  


    
    <br>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
@endsection