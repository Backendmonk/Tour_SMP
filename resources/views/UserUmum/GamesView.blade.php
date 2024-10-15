@extends('layout.main')
@section('judul')
 Games
@endsection
@section('isi')
<h1 data-aos="fade-up">Selamat Datang {{Auth::user()->name}} <span>Siap Mengikuti Quis ?</span></h1>
<p data-aos="fade-up" data-aos-delay="100">Tekan Tombol Start Untuk Memulai !<br></p>
<form action="/gamestart" method="GET">
@csrf
<button type="submit" id="soalStart" class="btn btn-primary">Start</button>
</form>




@endsection