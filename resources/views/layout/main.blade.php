
@include('layout.header')
  <main class="main">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Hero Section -->
    <section id="hero" class="hero section">
      <div class="hero-bg">
        
      </div>
      <div class="container text-left">
        <div class="d-flex flex-column justify-content-center align-items-center">
         @yield('isi')
        </div>
            
    </section><!-- /Contact Section -->

  </main>
@include('layout.footer')