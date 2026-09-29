<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/profil', label: 'Profil' },
  { to: '/ekstrakurikuler', label: 'Ekstrakurikuler' },
  { to: '/berita', label: 'Berita' },
  { to: '/kontak', label: 'Kontak' },
]

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-[#FBF9F4]/90 backdrop-blur-md border-b border-[#16523A]/10 transition-all duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

      <!-- LOGO / BRANDING -->
      <router-link 
        to="/" 
        @click="closeMenu" 
        class="group flex items-center gap-3 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16523A] rounded-lg"
      >
        <div class="w-9 h-9 rounded-xl bg-[#16523A] flex items-center justify-center text-[#FBF9F4] font-semibold text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
          T udpate
        </div>
        <div class="flex flex-col leading-tight">
          <span class="text-base font-bold text-[#16523A] tracking-tight group-hover:text-[#16523A]/80 transition-colors">
            SMP Taman Dewasa
          </span>
          <span class="text-[11px] font-medium text-[#5B6B62]">
            Jetis, Yogyakarta
          </span>
        </div>
      </router-link>

      <!-- DESKTOP NAVIGATION -->
      <nav class="hidden md:flex items-center gap-1 bg-[#16523A]/5 p-1 rounded-full border border-[#16523A]/10">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-4 py-1.5 text-xs font-medium text-[#3C463F] rounded-full transition-all duration-200 hover:text-[#16523A] hover:bg-white/60"
          active-class="!bg-[#16523A] !text-[#FBF9F4] font-semibold shadow-xs"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <!-- MOBILE MENU TOGGLE -->
      <div class="flex items-center md:hidden">
        <button
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle menu navigasi"
          class="p-2 rounded-xl text-[#16523A] hover:bg-[#16523A]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16523A] transition-colors"
        >
          <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

    </div>

    <!-- MOBILE NAVIGATION DROPDOWN -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="isMenuOpen"
        class="md:hidden border-t border-[#16523A]/10 bg-[#FBF9F4]/98 backdrop-blur-lg px-4 py-3 space-y-1 shadow-lg"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          @click="closeMenu"
          class="block px-4 py-2.5 rounded-lg text-sm font-medium text-[#3C463F] hover:bg-[#16523A]/10 hover:text-[#16523A] transition-all"
          active-class="!bg-[#16523A] !text-[#FBF9F4] font-semibold"
        >
          {{ link.label }}
        </router-link>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

header {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}
</style>