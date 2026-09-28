<script setup>
import { ref } from 'vue'

const fasilitasList = ref([
  { nama: 'Laboratorium Komputer', desc: 'Dilengkapi perangkat modern dan akses internet cepat.' },
  { nama: 'Perpustakaan Digital', desc: 'Koleksi buku cetak & e-book yang lengkap dan nyaman.' },
  { nama: 'Laboratorium IPA', desc: 'Fasilitas praktikum Fisika, Biologi, dan Kimia dasar.' },
  { nama: 'Lapangan Olahraga', desc: 'Tersedia lapangan Basket, Futsal, dan Voli.' },
  { nama: 'Ruang Seni & Musik', desc: 'Wadah mengasah kreativitas dan bakat seni siswa.' },
  { nama: 'Musholla & Kantin Sehat', desc: 'Sarana ibadah dan penyedia konsumsi bersih serta bergizi.' }
])
</script>

<template>
  <div class="profil bg-[#FBF9F4] text-[#0F3B29]">
    <!-- Judul halaman -->
    <section class="relative overflow-hidden bg-[#0F3B29] px-6 py-16 text-[#FBF9F4]">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#16523A_1px,transparent_1px)] opacity-40 [background-size:24px_24px]"></div>
      <div class="relative mx-auto max-w-6xl">
        <h1 class="text-3xl font-extrabold md:text-4xl">Profil Sekolah</h1>
        <p class="mt-3 max-w-xl text-[#FBF9F4]/70">
          Mengenal lebih dekat sejarah, visi, misi, dan fasilitas pendidikan yang kami sediakan.
        </p>
      </div>
    </section>

    <div class="mx-auto max-w-6xl space-y-16 px-6 py-14">
      <!-- Visi & Misi -->
      <div class="grid gap-6 md:grid-cols-2">
        <div class="relative overflow-hidden rounded-3xl bg-[#16523A] p-8 text-[#FBF9F4] shadow-xl shadow-[#0F3B29]/15 md:p-10">
          <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#FBF9F4_1px,transparent_1px)] opacity-10 [background-size:24px_24px]"></div>
          <div class="relative">
            <h2 class="text-2xl font-bold">Visi Sekolah</h2>
            <p class="mt-4 text-lg leading-relaxed text-[#FBF9F4]/85">
              Terwujudnya lulusan yang berakhlak mulia, unggul dalam prestasi akademik maupun non-akademik, serta berwawasan lingkungan.
            </p>
          </div>
        </div>

        <div class="rounded-3xl border border-[#E2DDD0] bg-white p-8 md:p-10">
          <h2 class="text-2xl font-bold">Misi Sekolah</h2>
          <ul class="mt-4 list-inside list-disc space-y-3 text-[#0F3B29]/75 marker:text-[#16523A]">
            <li>Menyelenggarakan pembelajaran yang inovatif, kreatif, dan menyenangkan.</li>
            <li>Menanamkan nilai-nilai keagamaan dan budi pekerti luhur dalam kehidupan sehari-hari.</li>
            <li>Mengembangkan potensi minat dan bakat siswa melalui kegiatan ekstrakurikuler.</li>
            <li>Meningkatkan penguasaan teknologi informasi dan komunikasi untuk mendukung proses belajar.</li>
          </ul>
        </div>
      </div>

      <!-- Sejarah -->
      <div class="grid items-start gap-6 md:grid-cols-3 md:gap-10">
        <h2 class="text-2xl font-bold md:text-3xl">Sejarah Singkat</h2>
        <p class="border-l-4 border-[#16523A] pl-5 leading-relaxed text-[#0F3B29]/80 md:col-span-2">
          Didirikan pada tahun 1995, sekolah kami terus berkembang menjadi salah satu lembaga pendidikan yang terpercaya. Dengan komitmen tinggi terhadap kualitas pengajaran dan pembentukan karakter, sekolah kami telah meluluskan ribuan alumni yang berhasil melanjutkan pendidikan ke jenjang terbaik.
        </p>
      </div>

      <!-- Fasilitas -->
      <div>
        <h2 class="text-2xl font-bold md:text-3xl">Fasilitas Sekolah</h2>
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="f in fasilitasList"
            :key="f.nama"
            class="rounded-2xl border border-[#E2DDD0] bg-white p-6 transition hover:-translate-y-1 hover:border-[#16523A]/40 hover:shadow-lg"
          >
            <h3 class="text-lg font-bold">{{ f.nama }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-[#0F3B29]/70">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.profil {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}
</style>