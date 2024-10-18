@extends('LayoutAdm.main')
@section('judul')
    <title>Home</title>
@endsection
@section('isi')
<br>

<br>
<h1>Data Soal</h1>



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



            <div class="row">
                <div class="col-xl-5 col-md-8">
                    <div class="card bg-primary text-white mb-4">
                        <div class="card-body">Soal Mendengarkan</div>
                        <div class="card-body">@if ($JmlSoalLS < 1)
                            {{0}}
                        @else
                            {{$JmlSoalLS}}
                        @endif</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="/listeningAdd">Tambah Soal</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                {{-- <div class="col-xl-5 col-md-8">
                    <div class="card bg-warning text-white mb-4">
                        <div class="card-body">Soal Membaca</div>
                        <div class="card-body">
                                @if ($JmlSoalRD < 1)
                                    {{0}}
                                @else
                                {{$JmlSoalRD}}
                                @endif
                         </div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="/readingAdd">Tambah Soal</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div> --}}


                <div class="card mb-4">
                    <div class="card-header">
                        <i class="fas fa-table me-1"></i>
                        Data Soal
                    </div>
                    <div class="card-body">
                        <table id="datatablesSimple">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Soal</th>
                                    <th>Jenis Soal</th>
                                    <th>Edit</th>
                                    <th>Hapus</th>
                                </tr>
                            </thead>
                            
                            <tbody>

                                @foreach ($DataSoal as $soal)

                                <tr>
                                    <th>{{$soal->id}}</th>
                                    <th>{{$soal->soal}}</th>
                                    <th>{{$soal->jenis_soal}}</th>
                                    <!-- Edit-->
                                    <th>
                                        <form action="/editsoal" method="POST">
                                            @csrf

                                            <button type="submit" class="btn btn-primary">Edit</button>

                                        </form>

                                    </th>


                                        <th>  
                                    <form action="/hapusSoal" method="POST">
                                        @csrf

                                        <input type="text" name = "id_soal" hidden value = "{{$soal->id}}">
                                        <input type="text"name = "path" hidden value = "{{$soal->path}}">
                                       <button type="submit" class="btn btn-danger">Hapus</button>
                                        
                                    </form>
                                </th>
                                </tr>
                                    
                                @endforeach
                             
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
               
               
@endsection