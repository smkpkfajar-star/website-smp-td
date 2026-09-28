<script setup>
import { ref } from 'vue'

const ekskulList = ref([
  { nama: 'Pramuka', kategori: 'Wajib', jadwal: 'Jumat, 15.00 WIB', desc: 'Melatih kedisiplinan, kemandirian, dan kepemimpinan.' },
  { nama: 'Paskibra', kategori: 'Organisasi', jadwal: 'Sabtu, 08.00 WIB', desc: 'Membentuk ketahanan fisik, mental, dan baris-berbaris.' },
  { nama: 'PMR (Palang Merah Remaja)', kategori: 'Kemanusiaan', jadwal: 'Rabu, 15.30 WIB', desc: 'Edukasi pertolongan pertama dan kepedulian sosial.' },
  { nama: 'Futsal & Basket', kategori: 'Olahraga', jadwal: 'Selasa & Kamis, 16.00 WIB', desc: 'Mengasah kemampuan fisik, teknik, dan kerja sama tim.' },
  { nama: 'Klub Komputer & Coding', kategori: 'Akademik', jadwal: 'Senin, 15.30 WIB', desc: 'Mempelajari dasar pemrograman, pemrosesan dokumen, dan desain.' },
  { nama: 'Seni Musik & Seni Tari', kategori: 'Seni', jadwal: 'Rabu, 15.00 WIB', desc: 'Wadah mengekspresikan kreativitas dan seni budaya.' }
])

const warnaKategori = {
  Wajib: 'bg-emerald-100 text-emerald-800',
  Organisasi: 'bg-amber-100 text-amber-800',
  Kemanusiaan: 'bg-rose-100 text-rose-800',
  Olahraga: 'bg-orange-100 text-orange-800',
  Akademik: 'bg-sky-100 text-sky-800',
  Seni: 'bg-violet-100 text-violet-800'
}
</script>

<template>
  <div class="ekskul bg-[#FBF9F4] text-[#0F3B29]">
    <!-- Judul halaman -->
    <section class="relative overflow-hidden bg-[#0F3B29] px-6 py-16 text-[#FBF9F4]">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#16523A_1px,transparent_1px)] opacity-40 [background-size:24px_24px]"></div>
      <div class="relative mx-auto max-w-6xl">
        <h1 class="text-3xl font-extrabold md:text-4xl">Ekstrakurikuler</h1>
        <p class="mt-3 max-w-xl text-[#FBF9F4]/70">
          Berbagai kegiatan untuk mengembangkan minat dan bakat siswa di luar jam pelajaran.
        </p>
      </div>
    </section>

    <!-- Daftar ekskul -->
    <div class="mx-auto max-w-6xl px-6 py-14">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="ekskul in ekskulList"
          :key="ekskul.nama"
          class="flex flex-col justify-between rounded-2xl border border-[#E2DDD0] bg-white p-6 transition hover:-translate-y-1 hover:border-[#16523A]/40 hover:shadow-lg"
        >
          <div>
            <span
              class="inline-block rounded-full px-3 py-1 text-xs font-semibold"
              :class="warnaKategori[ekskul.kategori] ?? 'bg-slate-100 text-slate-700'"
            >
              {{ ekskul.kategori }}
            </span>
            <h3 class="mt-4 text-xl font-bold leading-snug">{{ ekskul.nama }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-[#0F3B29]/70">{{ ekskul.desc }}</p>
          </div>

          <div class="mt-6 flex items-center gap-2 rounded-xl bg-[#FBF9F4] px-3 py-2.5 text-sm font-medium text-[#16523A]">
            <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            {{ ekskul.jadwal }}
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.ekskul {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}
</style>