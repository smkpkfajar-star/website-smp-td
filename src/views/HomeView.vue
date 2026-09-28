<script setup>
import { ref } from 'vue'

// Isi `gambar` dengan path foto, contoh: '/images/berita/ppdb.jpg'
const beritaTerbaru = ref([
  {
    id: 1,
    judul: 'Penerimaan Peserta Didik Baru (PPDB) T.A 2026/2027 Resmi Dibuka',
    tanggal: '20 September 2026',
    kategori: 'Pengumuman',
    ringkasan: 'Pendaftaran siswa baru untuk tahun ajaran baru telah dibuka secara online maupun offline.',
    gambar: ''
  },
  {
    id: 2,
    judul: 'Tim Pramuka Meraih Juara Umum di Perkemahan Daerah',
    tanggal: '15 September 2026',
    kategori: 'Prestasi',
    ringkasan: 'Siswa-siswi menunjukkan keunggulan kedisiplinan dan keterampilan di ajang pramuka tingkat kabupaten.',
    gambar: ''
  },
  {
    id: 3,
    judul: 'Pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK)',
    tanggal: '10 September 2026',
    kategori: 'Akademik',
    ringkasan: 'Kegiatan ANBK berjalan dengan lancar didukung fasilitas laboratorium komputer sekolah.',
    gambar: ''
  }
])

// Isi dengan path foto, contoh: '/images/sekolah.jpg'. Kosong = tampil placeholder.
const fotoSekolah = ''
const fotoKepsek = ''

const statistik = [
  { nilai: 'A', label: 'Akreditasi' },
  { nilai: '500+', label: 'Siswa aktif' },
  { nilai: '35+', label: 'Guru dan staf' },
  { nilai: '12', label: 'Ekstrakurikuler' }
]

const warnaKategori = {
  Pengumuman: 'bg-amber-100 text-amber-800',
  Prestasi: 'bg-emerald-100 text-emerald-800',
  Akademik: 'bg-sky-100 text-sky-800'
}
</script>

<template>
  <div class="home bg-[#FBF9F4] text-[#0F3B29]">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-[#0F3B29] text-[#FBF9F4]">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#16523A_1px,transparent_1px)] opacity-40 [background-size:24px_24px]"></div>

      <div class="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-36 pt-20 md:grid-cols-2">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full border border-[#FBF9F4]/15 bg-[#16523A]/60 px-4 py-1.5 text-sm">
            <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
            Penerimaan siswa baru dibuka
          </span>

          <h1 class="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Generasi cerdas, berkarakter, dan berprestasi
          </h1>
          <p class="mt-4 max-w-md text-lg text-[#FBF9F4]/70">
            Pendidikan berkualitas berbasis teknologi dan pembentukan karakter di Taman Madya Jetis.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <router-link to="/spmb" class="rounded-xl bg-[#FBF9F4] px-6 py-3 font-semibold text-[#0F3B29] shadow-lg shadow-black/20 transition hover:bg-[#E2DDD0]">
              Daftar sekarang
            </router-link>
            <router-link to="/profil" class="rounded-xl border border-[#FBF9F4]/30 px-6 py-3 font-semibold transition hover:bg-[#FBF9F4]/10">
              Profil sekolah
            </router-link>
          </div>
        </div>

        <!-- Ganti dengan foto sekolah -->
        <div class="relative">
          <div class="absolute -inset-3 rotate-3 rounded-3xl bg-[#16523A]"></div>
          <div class="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#FBF9F4]/15 bg-[#E2DDD0]/10">
            <img v-if="fotoSekolah" :src="fotoSekolah" alt="Gedung Taman Madya Jetis" class="h-full w-full object-cover" />
            <div v-else class="flex h-full items-center justify-center text-sm text-[#FBF9F4]/60">Foto sekolah</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistik (menumpuk di atas hero) -->
    <section class="relative z-10 mx-auto -mt-16 max-w-5xl px-6">
      <div class="grid grid-cols-2 divide-[#E2DDD0] rounded-2xl border border-[#E2DDD0] bg-white py-6 shadow-xl shadow-[#0F3B29]/10 md:grid-cols-4 md:divide-x">
        <div v-for="s in statistik" :key="s.label" class="px-4 py-2 text-center">
          <p class="text-3xl font-extrabold text-[#16523A] md:text-4xl">{{ s.nilai }}</p>
          <p class="mt-1 text-sm text-[#0F3B29]/60">{{ s.label }}</p>
        </div>
      </div>
    </section>

    <!-- Sambutan -->
    <section class="mx-auto max-w-5xl px-6 py-20">
      <div class="grid items-center gap-10 md:grid-cols-3">
        <div class="aspect-square overflow-hidden rounded-3xl bg-[#E2DDD0]/60">
          <img v-if="fotoKepsek" :src="fotoKepsek" alt="Kepala sekolah" class="h-full w-full object-cover" />
          <div v-else class="flex h-full items-center justify-center text-sm text-[#0F3B29]/50">Foto kepala sekolah</div>
        </div>
        <div class="md:col-span-2">
          <h2 class="text-2xl font-bold md:text-3xl">Sambutan Kepala Sekolah</h2>
          <p class="mt-4 border-l-4 border-[#16523A] pl-5 text-lg leading-relaxed text-[#0F3B29]/80">
            Selamat datang di website resmi sekolah kami. Kami berkomitmen menyediakan lingkungan belajar yang aman, kondusif, dan berteknologi untuk mendukung bakat dan minat setiap siswa.
          </p>
          <p class="mt-4 font-semibold">Nama Kepala Sekolah, M.Pd.</p>
        </div>
      </div>
    </section>

    <!-- Berita -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-6xl px-6">
        <div class="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-bold md:text-3xl">Berita dan Pengumuman</h2>
            <p class="mt-1 text-[#0F3B29]/60">Kabar terbaru dari sekolah</p>
          </div>
          <router-link to="/berita" class="rounded-lg border border-[#16523A]/30 px-4 py-2 text-sm font-semibold text-[#16523A] transition hover:bg-[#16523A] hover:text-white">
            Lihat semua
          </router-link>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <router-link
            v-for="item in beritaTerbaru"
            :key="item.id"
            to="/berita"
            class="group flex flex-col overflow-hidden rounded-2xl border border-[#E2DDD0] bg-[#FBF9F4] transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="aspect-[16/10] overflow-hidden bg-[#E2DDD0]/60">
              <img
                v-if="item.gambar"
                :src="item.gambar"
                :alt="item.judul"
                loading="lazy"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div v-else class="flex h-full items-center justify-center text-sm text-[#0F3B29]/40">
                Cover berita
              </div>
            </div>

            <div class="flex flex-1 flex-col p-6">
              <div class="flex items-center justify-between gap-2">
                <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="warnaKategori[item.kategori]">
                  {{ item.kategori }}
                </span>
                <span class="text-xs text-[#0F3B29]/50">{{ item.tanggal }}</span>
              </div>
              <h3 class="mt-4 text-lg font-bold leading-snug group-hover:text-[#16523A]">{{ item.judul }}</h3>
              <p class="mt-2 flex-1 text-sm text-[#0F3B29]/70">{{ item.ringkasan }}</p>
              <span class="mt-4 text-sm font-semibold text-[#16523A]">Baca selengkapnya</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-6 py-20">
      <div class="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#16523A] px-8 py-14 text-center text-[#FBF9F4] shadow-xl shadow-[#0F3B29]/20">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#FBF9F4_1px,transparent_1px)] opacity-10 [background-size:24px_24px]"></div>
        <div class="relative">
          <h2 class="text-2xl font-bold md:text-3xl">Ingin bergabung dengan kami?</h2>
          <p class="mx-auto mt-3 max-w-md text-[#FBF9F4]/75">Lihat alur, syarat, dan jadwal pendaftaran siswa baru.</p>
          <router-link to="/spmb" class="mt-8 inline-block rounded-xl bg-[#FBF9F4] px-7 py-3 font-semibold text-[#0F3B29] transition hover:bg-[#E2DDD0]">
            Cek syarat pendaftaran
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.home {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}
</style>