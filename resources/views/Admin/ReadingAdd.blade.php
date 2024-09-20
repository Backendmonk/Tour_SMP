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

<form>
    <div class="form-group">
      <label for="exampleFormControlInput1">Soal</label>
      <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Soal di Sini" name = "soal">
    </div>


    <div class="form-group">
      
        <input hidden  type="text" class="form-control" id="exampleFormControlInput1" name = "jenis_soal" value="reading">
      </div>
      
    
      <div class="form-group">
        <label for="exampleFormControlInput1">Soal</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Soal di Sini" name = "soal">
      </div>

      
      <div class="form-group">
        <label for="exampleFormControlInput1">Soal</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Soal di Sini" name = "soal">
      </div>

      <div class="form-group">
        <label for="exampleFormControlInput1">Soal</label>
        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Soal di Sini" name = "soal">
      </div>
  

    <div class="form-group">
      <label for="exampleFormControlSelect1">Example select</label>
      <select class="form-control" id="exampleFormControlSelect1">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlSelect2">Example multiple select</label>
      <select multiple class="form-control" id="exampleFormControlSelect2">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Example textarea</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
  </form>
               
               
@endsection