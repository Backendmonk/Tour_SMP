@extends('layout.main')
@section('judul')
Profile Sekolah
@endsection
@section('isi')

<section id="about" class="about section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>SMPN 1 KUTA UTARA</h2>
     
    </div><!-- End Section Title -->

    <div class="container" data-aos="fade-up">

      <div class="row g-4 g-lg-5" data-aos="fade-up" data-aos-delay="200">

        <div class="col-lg-5">
          <div class="about-img">
            <img src="{{ asset('/')}}imgs/logos.png " class="img-fluid" alt="">
          </div>
        </div>

        <div class="col-lg-7">
          <h3 class="pt-0 pt-lg-5">Mengenai SMPN 1 Kuta Utara</h3>

          <!-- Tab Content -->
          <div class="tab-content">

            <div class="tab-pane fade show active" id="about-tab1">

              <p class="fst-italic">SMP Negeri 1 Kuta Utara terletak di Jalan Kesambi No. 4, Kerobokan, Kuta Utara, Kabupaten Badung, Bali. Lokasinya yang strategis di wilayah pariwisata Bali memberikan nilai tambah dengan suasana belajar yang tenang, dikelilingi oleh budaya lokal yang kaya, sehingga siswa dapat lebih menghargai keragaman dan mengembangkan jiwa sosial mereka</p>

              

          </div>

        </div>
      </div>

    </div>
  </section><!-- /About Section -->




  
    <!-- Pricing Section -->
    <section id="pricing" class="pricing section">

        <!-- Section Title -->
        <div class="container section-title" data-aos="fade-up">
          <h2>Ruang Kelas</h2>

          <p>Sekolah ini dilengkapi dengan berbagai fasilitas, termasuk ruang kelas yang nyaman, laboratorium, perpustakaan, ruang kegiatan siswa, dan sarana olahraga. Dengan fasilitas yang memadai, SMPN 1 Kuta Utara mendukung siswa dalam mengembangkan kemampuan akademis dan keterampilan hidup mereka. Sekolah ini juga memberikan perhatian khusus pada kebersihan dan fasilitas sanitasi, yang penting untuk kesehatan dan kenyamanan siswa</p>
        </div><!-- End Section Title -->
  
        <div class="container" data-aos="fade-up" data-aos-delay="100">
  
          <div class="row gy-4">
  
            <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="200">
              <div class="pricing-item">
  
                <div class="pricing-header">
                  <h3>Ruang Kelas</h3>
                  <h4>37</h4>
                </div>
    
              </div>
            </div><!-- End Pricing Item -->
  
            <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="400">
              <div class="pricing-item featured">
  
                <div class="pricing-header">
                  <h3>Ruang LAB</h3>
                  <h4>4</h4>
                </div>
  
                
  
               
              </div>
            </div><!-- End Pricing Item -->
  
            <div class="col-lg-4" data-aos="zoom-in" data-aos-delay="600">
              <div class="pricing-item">
  
                <div class="pricing-header">
                  <h3>Ruang Perpus</h3>
                  <h4>1</h4>
                </div>
  
               
  
  
              </div>
            </div><!-- End Pricing Item -->
  
          </div>
  
        </div>
  
      </section><!-- /Pricing Section -->








       <!-- Faq Section -->
    <section id="faq" class="faq section">

        <div class="container-fluid">
  
          <div class="row gy-4">
  
            <div class="col-lg-7 d-flex flex-column justify-content-center order-2 order-lg-1">
  
              <div class="content px-xl-5" data-aos="fade-up" data-aos-delay="100">
                <h3><span>Visi </span><strong>Misi</strong></h3>
              </div>
  
              <div class="faq-container px-xl-5" data-aos="fade-up" data-aos-delay="200">
  
                <div class="faq-item faq-active">
                  <i class="faq-icon bi bi-question-circle"></i>
                  <h3>Visi</h3>
                  <div class="faq-content">
                    <p>“Terwujudnya Pelajar Pancasila yang Berkarakter, Berprestasi, dan Peduli Lingkungan Berlandaskan Tri Hita Karana.” Visi ini berupaya menciptakan siswa yang memiliki karakter kuat, pencapaian akademik maupun non-akademik, serta kesadaran dan kepedulian terhadap lingkungan berdasarkan nilai-nilai lokal Bali, yaitu Tri Hita Karana, yang melibatkan keharmonisan hubungan manusia dengan Tuhan, sesama, dan alam</p>
                  </div>
                  <i class="faq-toggle bi bi-chevron-right"></i>
                </div><!-- End Faq item-->
  
                <div class="faq-item">
                  <i class="faq-icon bi bi-question-circle"></i>
                  <h3>Misi</h3>
                  <div class="faq-content">
                    <p>
                        1.Mencapai prestasi baik di bidang akademik maupun non-akademik.
                        <br>
                        2.Membentuk profil pelajar Pancasila yang bertaqwa, mandiri, dan kreatif.  <br>
                        3.Melaksanakan pembelajaran yang menarik dan sesuai dengan minat siswa.  <br>
                        4.Meningkatkan manajemen pendidikan yang adaptif dan berkualitas.  <br>
                        5.Menciptakan lingkungan sekolah yang mendukung perkembangan siswa di berbagai aspek.  <br>
                        6.Menjamin hak belajar setiap anak, termasuk anak berkebutuhan khusus.  <br>
                        7.Menumbuhkan sikap kepedulian terhadap lingkungan.  <br>
                        8.Meningkatkan partisipasi aktif orang tua dan masyarakat dalam kegiatan sekolah​
                        </p>
                  </div>
                  <i class="faq-toggle bi bi-chevron-right"></i>
                </div><!-- End Faq item-->
  
  
              </div>
  
            </div>
  
            <div class="col-lg-5 order-1 order-lg-2">
              <img src="{{asset('/') }}imgs/FAQ.jpg" class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="100">
            </div>
          </div>
  
        </div>
  
      </section><!-- /Faq Section -->

      

    




  <!-- Portfolio Section -->
  <section id="portfolio" class="portfolio section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Video</h2>
      <p>Video SMPN 1 Kuta Utara</p>
    </div><!-- End Section Title -->

    <video class="w-100" controls>
        <source src="{{ asset('/') }}imgs/vid1.mp4" type="video/mp4" />
      </video>
    
      <br>
      <p>
        Jelajahi lingkungan belajar kami yang kondusif dan inspiratif dengan mengunjungi halaman <a href="/TourSekolah">Tour Sekolah </a>kami. Dapatkan gambaran mendalam tentang fasilitas, kegiatan, dan keunikan SMP Negeri 1 Kuta Utara. Ayo, klik di sini untuk memulai perjalanan Anda dan lihat bagaimana kami mendukung pengembangan karakter serta prestasi siswa dalam suasana yang nyaman dan penuh semangat belajar
      </p>
    


  </section><!-- /Portfolio Section -->
@endsection