<script setup>
const sekolah = {
  nama: 'SMP Taman Dewasa Jetis',
  alamat: 'Jl. A.M. Sangaji No. 39, Cokrodiningratan, Kec. Jetis, Kota Yogyakarta, D.I. Yogyakarta 55233',
  telepon: '(0274) 587022',
  teleponLink: 'tel:+62274587022',
  website: 'smptdjetis.sch.id',
  websiteLink: 'https://smptdjetis.sch.id',
  instagram: '@smptamandewasajetisjogja',
  instagramLink: 'https://www.instagram.com/smptamandewasajetisjogja/',
  jam: 'Senin - Jumat, 07.00 - 15.00 WIB'
}

const query = encodeURIComponent('SMP Taman Dewasa Jetis, Jl. A.M. Sangaji 39, Yogyakarta')
const petaEmbed = `https://www.google.com/maps?q=${query}&output=embed`
const petaLink = `https://www.google.com/maps/search/?api=1&query=${query}`

const kontak = [
  {
    judul: 'Alamat',
    isi: sekolah.alamat,
    link: petaLink,
    aksi: 'Buka di Google Maps',
    ikon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z'
  },
  {
    judul: 'Telepon',
    isi: sekolah.telepon,
    link: sekolah.teleponLink,
    aksi: 'Hubungi sekarang',
    ikon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
  },
  {
    judul: 'Website',
    isi: sekolah.website,
    link: sekolah.websiteLink,
    aksi: 'Kunjungi website',
    ikon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9'
  },
  {
    judul: 'Instagram',
    isi: sekolah.instagram,
    link: sekolah.instagramLink,
    aksi: 'Ikuti kabar sekolah',
    ikon: 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8zm5.5-1.5h.01'
  }
]
</script>

<template>
  <div class="kontak bg-[#FBF9F4] text-[#0F3B29]">
    <!-- Header -->
    <section class="relative overflow-hidden bg-[#0F3B29] px-6 pb-32 pt-16 text-center text-[#FBF9F4]">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#16523A_1px,transparent_1px)] opacity-40 [background-size:24px_24px]"></div>
      <div class="pointer-events-none absolute -top-24 left-1/2 h-48 w-[600px] -translate-x-1/2 bg-[#16523A] opacity-50 blur-[100px]"></div>
      <div class="relative mx-auto max-w-2xl">
        <span class="inline-flex items-center gap-2 rounded-full border border-[#FBF9F4]/15 bg-[#16523A]/60 px-4 py-1.5 text-sm">
          <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
          Kami siap membantu
        </span>
        <h1 class="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">Hubungi Kami</h1>
        <p class="mt-4 text-lg text-[#FBF9F4]/70">
          Punya pertanyaan seputar sekolah atau pendaftaran? Hubungi kami atau kunjungi langsung {{ sekolah.nama }}.
        </p>
      </div>
    </section>

    <!-- Kartu kontak (menumpuk di atas header) -->
    <section class="relative z-10 mx-auto -mt-20 max-w-6xl px-6">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <a
          v-for="k in kontak"
          :key="k.judul"
          :href="k.link"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col rounded-2xl border border-[#E2DDD0] bg-white p-6 shadow-xl shadow-[#0F3B29]/10 transition hover:-translate-y-1"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16523A]/10 text-[#16523A] transition group-hover:bg-[#16523A] group-hover:text-[#FBF9F4]">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="k.ikon" />
            </svg>
          </div>
          <p class="mt-4 text-xs font-bold uppercase tracking-wider text-[#0F3B29]/50">{{ k.judul }}</p>
          <p class="mt-1 flex-1 break-words text-sm font-semibold leading-snug">{{ k.isi }}</p>
          <span class="mt-4 text-sm font-semibold text-[#16523A]">{{ k.aksi }} &rarr;</span>
        </a>
      </div>
    </section>

    <!-- Peta -->
    <section class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid items-stretch gap-8 lg:grid-cols-3">
        <div class="flex flex-col justify-between rounded-3xl bg-[#16523A] p-8 text-[#FBF9F4] lg:col-span-1">
          <div>
            <h2 class="text-2xl font-bold">Kunjungi sekolah</h2>
            <p class="mt-3 text-[#FBF9F4]/75">
              Kami berada di kawasan Jetis, Kota Yogyakarta. Silakan datang pada jam layanan.
            </p>

            <div class="mt-6 rounded-2xl border border-[#FBF9F4]/15 bg-[#0F3B29]/40 p-5">
              <p class="text-xs font-bold uppercase tracking-wider text-[#FBF9F4]/60">Jam layanan</p>
              <p class="mt-1 font-semibold">{{ sekolah.jam }}</p>
            </div>
          </div>

          <a
            :href="petaLink"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#FBF9F4] px-6 py-3 font-semibold text-[#0F3B29] transition hover:bg-[#E2DDD0]"
          >
            Petunjuk arah
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-6-6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div class="min-h-[22rem] overflow-hidden rounded-3xl border border-[#E2DDD0] bg-[#E2DDD0]/50 shadow-lg shadow-[#0F3B29]/5 lg:col-span-2">
          <iframe
            :src="petaEmbed"
            title="Lokasi SMP Taman Dewasa Jetis"
            class="h-full min-h-[22rem] w-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-6 pb-20">
      <div class="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#0F3B29] px-8 py-12 text-center text-[#FBF9F4] shadow-xl shadow-[#0F3B29]/20">
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#FBF9F4_1px,transparent_1px)] opacity-10 [background-size:24px_24px]"></div>
        <div class="relative">
          <h2 class="text-2xl font-bold md:text-3xl">Tertarik mendaftar?</h2>
          <p class="mx-auto mt-3 max-w-md text-[#FBF9F4]/75">Lihat alur, syarat, dan jadwal pendaftaran siswa baru.</p>
          <router-link to="/spmb" class="mt-6 inline-block rounded-xl bg-[#FBF9F4] px-7 py-3 font-semibold text-[#0F3B29] transition hover:bg-[#E2DDD0]">
            Cek syarat pendaftaran
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.kontak {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}
</style>