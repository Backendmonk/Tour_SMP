@extends('LayoutAdm.main')
@section('judul')
    <title>Home</title>
@endsection
@section('isi')
<br>

<br>
<h1>Edit Data Diri {{Auth::user()->name}}</h1>



@if (session()->has('berhasil'))
  
<script>
                Swal.fire({
                    icon: "success",
                    title: "Berhasil !",
                    text: "Akun Terupdate"
                    
                    
                });

</script>
  
@endif

<div class="form-group">
    <form action="/editpassAdmin" method="post"><button type ="submit" class ="btn btn-warning">Edit Password</button></form>
</div>
<br>
<form method="POST" action ="/UpdatedataAdmin">
    @csrf

    <input type="text" value="{{Auth::user()->id}}" readonly hidden name="id">
    <div class="form-group">
        <label for="exampleInputEmail1">Nama</label>
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value="{{Auth::user()->name}}" name = "nama">
        
      </div>

    <div class="form-group">
      <label for="exampleInputEmail1">Email</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value="{{Auth::user()->email}}" name = "email">
     
    </div>
    <br>
    
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
@endsection