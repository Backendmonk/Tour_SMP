
@extends('layout.main')
@section('judul')
 Hasil Soal
@endsection
@section('isi')
<br>

<br>
<h1>Data Hasi  Soal</h1>



@if (session()->has('berhasil'))
  
<script>
                Swal.fire({
                    icon: "success",
                    title: "Berhasil !",
                    text: "Soal Berhasil ditambah"
                    
                    
                });

</script>
  
@endif


@if (session()->has('berhasilHapus'))
  
<script>
                Swal.fire({
                    icon: "success",
                    title: "Berhasil !",
                    text: "Soal Berhasil dihapus"
                    
                    
                });

</script>
  
@endif




@if (session()->has('Gagal'))
  
<script>
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Soal Gagal Terhapus"
                    
                    
                });

</script>
  
@endif

               
@endsection