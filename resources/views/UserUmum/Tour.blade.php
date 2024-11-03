@extends('layout.main')
@section('judul')
Tour
@endsection
@section('isi')

<iframe src="{{asset('/')}}map/index.htm" width="100%" height="500px"></iframe>
@endsection