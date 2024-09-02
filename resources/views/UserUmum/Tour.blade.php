@extends('layout.main')
@section('judul')
 Games
@endsection
@section('isi')

<iframe src="{{asset('/')}}map/index.htm" width="100%" height="600px"></iframe>
@endsection