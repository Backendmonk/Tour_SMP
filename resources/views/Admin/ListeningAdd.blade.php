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



@if ($errors->any())
    
          <script>
            Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Adanya Kesalahan, Cek Kembali!"
                
                
            });

</script>
@endif

<form method="POST" action="/listeningsoalAdd" enctype="multipart/form-data">
  @csrf
  <div class="form-group">
    <label for="exampleFormControlTextarea1">Soal</label>
    <textarea name = "soal" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>

    <!--  Upload Audio-->

  <div class="form-group">
    <label for="exampleFormControlTextarea1">Audio</label>
    <input type="file" class="form-control" placeholder="Audio File" id="exampleFormControlInput1" name = "audio" required>

  </div>

    <!--  END -->

    <div class="form-group">
      
        <input hidden  type="text" class="form-control" id="exampleFormControlInput1" name = "jenis_soal" value="listening">
      </div>
            
      <div class="form-group">
        <label for="exampleFormControlInput1">Jawaban A</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Jawaban disini" name = "jbA">
      </div>

      <div class="form-group">
        <label for="exampleFormControlInput1">Jawaban B</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Jawaban disini" name = "jbB">
      </div>
      <div class="form-group">
        <label for="exampleFormControlInput1">Jawaban C</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Jawaban disini" name = "jbC">
      </div>
      <div class="form-group">
        <label for="exampleFormControlInput1">Jawaban D</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Jawaban disini" name = "jbD">
      </div>
  

    <div class="form-group">
      <label for="exampleFormControlSelect1">Jawaban Yang Benar</label>
      <select name ="jbTr" class="form-control" id="exampleFormControlSelect1">
        <option value ="a">A</option>
        <option value ="b">B</option>
        <option value = "c">C</option>
        <option value ="d">D</option>
      </select>
    </div>

  <br>

  <button type="submit" class="btn btn-primary">Tambah</button>
  
  </form>
               
               
@endsection