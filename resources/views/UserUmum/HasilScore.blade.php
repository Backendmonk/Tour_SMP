@extends('layout.main')
@section('judul')
 Games
@endsection
@section('isi')



    <h1 data-aos="fade-up">Selamat  {{Auth::user()->name}} Score kamu<span>{{"   ".$score}}</span></h1>
    <p data-aos="fade-up" data-aos-delay="100">Mau Main Lagi ?<br></p>

    <form action="/gamestart" method="GET">
        @csrf
        <button type="submit" class="btn btn-primary">Main Lagi</button>
        </form>

@endsection