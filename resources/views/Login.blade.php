@extends('layout.main')

@section('judul')
    Login
@endsection
@section('isi')
<h1><center>Login Form</center></h1>
<br>

<!-- error alert-->
@if (session()->has('error'))
  
    <script>
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Akun Tidak Ditemukan",
                        footer:"Cek Kembali Username dan Password"
                        
                    });

    </script>


  
  @endif


  
  @if (session()->has('suksesdaftar'))
  
    <script>
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil !",
                        text: "Akun Terdaftar",
                        footer:"Silahkan Login"
                        
                    });

    </script>
      
  @endif

  <!-- End Error Alert-->


<form method="POST" action="/LogUmum">
  @csrf
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" name = "email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" name ="password" class="form-control" id="exampleInputPassword1">
    </div>
    <br>
    <a href="/daftaruserUm">Belum Ada Akun ?</a>
    <br>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
@endsection