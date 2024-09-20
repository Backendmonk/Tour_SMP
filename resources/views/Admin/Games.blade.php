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
                    text: "Akun Terupdate"
                    
                    
                });

</script>
  
@endif


            <div class="row">
                <div class="col-xl-5 col-md-8">
                    <div class="card bg-primary text-white mb-4">
                        <div class="card-body">Soal Mendengarkan</div>
                        <div class="card-body">{{$JmlSoalLS}}</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="/listeningAdd">Tambah Soal</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-5 col-md-8">
                    <div class="card bg-warning text-white mb-4">
                        <div class="card-body">Soal Membaca</div>
                        <div class="card-body">{{$JmlSoalRD}}</div>
                        <div class="card-footer d-flex align-items-center justify-content-between">
                            <a class="small text-white stretched-link" href="/readingAdd">Tambah Soal</a>
                            <div class="small text-white"><i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>


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
                                    <th>Akses</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                             
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
               
               
@endsection