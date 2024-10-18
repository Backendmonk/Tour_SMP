@extends('layout.main')
@section('judul')
 Games
@endsection
@section('isigame')
 <h1><center>SOAL MENGENAI SEKOLAH</center></h1>

    @php
        $i = 0;
    @endphp
@foreach ($listSoal as $item)
    @php
        $i++;
    @endphp
<br>
<h3>
    <form method="POST" action="/sumbitJawaban">
        
        @csrf
        <div class="form-group">
          @if ($item->jenis_soal =="listening")
          <audio id = "audioPlayer"  controls>
  
        <source  src="{{asset($item->path) }}" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>  
  
        <script>
  
                      var audio = document.getElementById('audioPlayer');
  
                      audio.addEventListener('play', function() {
                        if (audio.played.length > 0) {
                              Swal.fire({
                              icon: "WARNING",
                              title: "Hanya Sekali",
                              text: "Audio Hanya Bisa Diputar Sekali"
                            
                          
                      });
                          audio.pause();  // Hentikan audio
                          audio.currentTime = 0;  // Reset posisi audio ke awal
                        }
                      });
  
                      audio.addEventListener('ended', function() {
                        audio.controls = false;  // Nonaktifkan kontrol setelah audio selesai
                      });
  
        </script>
      @endif

        
      <br>

        <label for="soal{{$item->id}}"> <b>{{$i}}.{{$item->soal}}</b></label>

   

        
      
        
       
                <!-----
                            pmbuatan name akan dilakukan dengan menggunakan array dimanana nantiya satu array yaitu jawaban[] akan membawa seluruh jawaban kedaman controller

                            array digunakan karena adanya perulangan pada soal

                            name ="jawaban"

                            tipe data name akan berupa array                    ---->

        <div class="custom-control custom-radio">
            
            <input required="true" type="radio" id="jawabanA_{{$item->id}}" name="jawaban[{{$item->id}}]" class="custom-control-input" Value ="a">
            <label class="custom-control-label" for="jawabanA_{{$item->id}}"  >A. {{$item->Jawaban_A}}</label>
          </div>


          <div class="custom-control custom-radio">
            <input required="true" type="radio" id="jawabanB_{{$item->id}}" name="jawaban[{{$item->id}}]" class="custom-control-input"  Value ="b">
            <label class="custom-control-label" for="jawabanB_{{$item->id}}">B. {{$item->Jawaban_B}}</label>
          </div>

          <div class="custom-control custom-radio">
            <input required="true" type="radio" id="jawabanC_{{$item->id}}" name="jawaban[{{$item->id}}]" class="custom-control-input"  Value ="c">
            <label class="custom-control-label" for="jawabanC_{{$item->id}}">C. {{$item->Jawaban_C}}</label>
          </div>

          <div class="custom-control custom-radio">
            <input  required="true" type="radio" id="jawabanD_{{$item->id}}" name="jawaban[{{$item->id}}]" class="custom-control-input" Value ="d">
            <label class="custom-control-label" for="jawabanD_{{$item->id}}" >D. {{$item->Jawaban_D}}</label>
          </div>

        </div>

    </h3>



@endforeach


<br>

<button type="submit" class="btn btn-primary">Selesai</button>
</form>  



@endsection