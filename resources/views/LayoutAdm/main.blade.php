@include('LayoutAdm.Header')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
       @include('LayoutAdm.sidebar')
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        
                        @yield('isi')
                    </div>
                </div>
                    
                    </div>
                </main>
                @include('LayoutAdm.footer')