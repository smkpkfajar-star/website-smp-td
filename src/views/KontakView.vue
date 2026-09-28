<template>
  <div class="py-12 px-6 max-w-5xl mx-auto space-y-10">
    <div class="text-center max-w-2xl mx-auto space-y-2">
      <h1 class="text-3xl font-extrabold text-slate-900">Hubungi Kami</h1>
      <p class="text-slate-500 text-sm">Punya pertanyaan seputar sekolah? Silakan hubungi kami atau kunjungi lokasi sekolah.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 class="text-xl font-bold text-slate-900">Informasi Kontak</h2>
        <div class="space-y-4 text-sm text-slate-600">
          <div class="flex items-start space-x-3">
            <span class="text-lg">📍</span>
            <div>
              <p class="font-semibold text-slate-800">Alamat</p>
              <p>Jl. Pendidikan No. 123, Yogyakarta</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-lg">📞</span>
            <div>
              <p class="font-semibold text-slate-800">Telepon</p>
              <p>(0274) 123456</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-lg">✉️</span>
            <div>
              <p class="font-semibold text-slate-800">Email</p>
              <p>info@sekolah.sch.id</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
        <p class="text-slate-400 text-sm mb-2">[ Sematkan Google Maps di sini ]</p>
        <p class="text-xs text-slate-500">Anda dapat menempelkan iframe Google Maps lokasi sekolah Anda di bagian ini.</p>
      </div>
    </div>
  </div>
</template>