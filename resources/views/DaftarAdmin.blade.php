@extends('layout.main')

@section('judul')
    Login
@endsection
@section('isi')
<h1><center>Login Admin</center></h1>
<br>
<form method="POST" action="/LogAdmin">
  @csrf
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" name = "email" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" name = "password" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1">Role</label>
        <input type="text" readonly name = "role" Value="Admin" class="form-control" id="exampleInputPassword1">
      </div>
  


    
    <br>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
@endsection