
@extends('layout.main')
@section('judul')
 Hasil Soal
@endsection
@section('isi')
<br>

<br>
<h1>Data Hasil  Soal</h1>



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


<br><br>


<table class="table">
    <thead>
      <tr>
        <th scope="col">NAMA</th>
        <th scope="col">SCORE</th>
        <th scope="col">TGL MAIN</th>
       
      </tr>
    </thead>
    <tbody>
     

        @foreach ($soal as $item)
        <tr>
            <TD>{{$item->nama_user}}</TD>
            <td>{{$item->score}}</td>
            <td>{{$item->tgl_main}}</td>
        </tr>
    
            @endforeach

        
    
     
    </tbody>
  </table>


     
@endsection