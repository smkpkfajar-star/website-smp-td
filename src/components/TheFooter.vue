<template>
  <footer class="relative bg-[#0F3B29] text-[#FBF9F4] pt-16 pb-10 overflow-hidden font-sans border-t border-[#16523A]/30">
    <!-- Background Glow & Pattern Accent -->
    <div class="absolute inset-0 bg-[radial-gradient(#16523A_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>
    <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#16523A] opacity-40 blur-[100px] pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-5 sm:px-8">
      
      <!-- Top Section: Brand Card & Navigation Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#FBF9F4]/10">
        
        <!-- Brand & Vision (5 Cols) -->
        <div class="lg:col-span-5 space-y-5">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FBF9F4] to-[#E2DDD0] text-[#0F3B29] font-extrabold flex items-center justify-center text-base shadow-lg shadow-black/10">
              TM
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-lg text-[#FBF9F4] tracking-tight leading-snug">
                Taman Madya Jetis
              </span>
              <span class="text-xs text-[#FBF9F4]/60 font-medium">
                Tamansiswa Jetis, Yogyakarta
              </span>
            </div>
          </div>

          <p class="text-sm text-[#FBF9F4]/70 leading-relaxed max-w-md">
            Membentuk generasi unggul, berkarakter mulia, dan berbudaya sesuai dengan asas-asas Perguruan Tamansiswa.
          </p>

          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16523A]/60 border border-[#FBF9F4]/10 backdrop-blur-sm text-xs font-medium text-[#FBF9F4]/80">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Yayasan Persatuan Perguruan Tamansiswa
          </div>
        </div>

        <!-- Links Grid (7 Cols) -->
        <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          <!-- Navigasi -->
          <div class="space-y-4">
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#FBF9F4]/50">
              Navigasi
            </h4>
            <ul class="space-y-2.5 text-sm">
              <li v-for="link in navLinks" :key="link.to">
                <router-link 
                  :to="link.to" 
                  class="text-[#FBF9F4]/75 hover:text-[#FBF9F4] hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  {{ link.label }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Informasi Kontak -->
          <div class="space-y-4 sm:col-span-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#FBF9F4]/50">
              Hubungi Kami
            </h4>
            <ul class="space-y-3 text-sm text-[#FBF9F4]/75">
              <li class="flex items-start gap-3 group">
                <div class="p-2 rounded-lg bg-[#16523A]/50 border border-[#FBF9F4]/10 group-hover:border-[#FBF9F4]/30 transition-colors shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-[#FBF9F4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span class="leading-snug">Jl. Pakuningratan 34A, Kec. Jetis, Kota Yogyakarta, D.I. Yogyakarta</span>
              </li>

              <li class="flex items-center gap-3 group">
                <div class="p-2 rounded-lg bg-[#16523A]/50 border border-[#FBF9F4]/10 group-hover:border-[#FBF9F4]/30 transition-colors shrink-0">
                  <svg class="w-4 h-4 text-[#FBF9F4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <span>(0274) 517522</span>
              </li>

              <li class="flex items-center gap-3 group">
                <div class="p-2 rounded-lg bg-[#16523A]/50 border border-[#FBF9F4]/10 group-hover:border-[#FBF9F4]/30 transition-colors shrink-0">
                  <svg class="w-4 h-4 text-[#FBF9F4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span class="break-all">tmjetis_sma@yahoo.co.id</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FBF9F4]/50">
        <p>&copy; {{ new Date().getFullYear() }} Taman Madya Jetis Yogyakarta. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <span class="hover:text-[#FBF9F4]/80 transition-colors cursor-pointer">Senin - Jumat: 07.00 - 15.00 WIB</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/profil', label: 'Profil Sekolah' },
  { to: '/ekstrakurikuler', label: 'Ekstrakurikuler' },
  { to: '/berita', label: 'Berita & Pengumuman' },
  { to: '/kontak', label: 'Kontak Kami' },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

footer {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}
</style>