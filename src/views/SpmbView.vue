<script setup>
import { ref } from 'vue'

const form = ref({
  nama: '',
  nisn: '',
  asalSekolah: '',
  hp: ''
})

const isSubmitted = ref(false)

const handleSubmit = () => {
  if (form.value.nama && form.value.nisn) {
    isSubmitted.value = true
  }
}
</script>

<template>
  <div class="py-12 px-6 max-w-5xl mx-auto space-y-12">
    <!-- Header -->
    <div class="text-center max-w-2xl mx-auto space-y-2">
      <h1 class="text-3xl font-extrabold text-slate-900">Penerimaan Peserta Didik Baru (PPDB)</h1>
      <p class="text-slate-500 text-sm">Informasi pendaftaran dan formulir konsultasi calon siswa baru.</p>
    </div>

    <!-- Alur Pendaftaran -->
    <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <h2 class="text-xl font-bold text-slate-900">Alur Pendaftaran</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
        <div class="p-4 bg-slate-50 rounded-xl">
          <div class="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-2 text-sm">1</div>
          <p class="font-semibold text-slate-800 text-sm">Isi Formulir</p>
          <p class="text-xs text-slate-500 mt-1">Lengkapi data diri pendaftar</p>
        </div>
        <div class="p-4 bg-slate-50 rounded-xl">
          <div class="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-2 text-sm">2</div>
          <p class="font-semibold text-slate-800 text-sm">Verifikasi Berkas</p>
          <p class="text-xs text-slate-500 mt-1">Serahkan dokumen pendukung</p>
        </div>
        <div class="p-4 bg-slate-50 rounded-xl">
          <div class="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-2 text-sm">3</div>
          <p class="font-semibold text-slate-800 text-sm">Tes Observasi</p>
          <p class="text-xs text-slate-500 mt-1">Pemetaan bakat & akademik</p>
        </div>
        <div class="p-4 bg-slate-50 rounded-xl">
          <div class="w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center mx-auto mb-2 text-sm">4</div>
          <p class="font-semibold text-slate-800 text-sm">Daftar Ulang</p>
          <p class="text-xs text-slate-500 mt-1">Penetapan siswa resmi</p>
        </div>
      </div>
    </div>

    <!-- Form Pendaftaran / Minat -->
    <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h2 class="text-xl font-bold text-slate-900 mb-6">Formulir Kontak PPDB</h2>

      <div v-if="isSubmitted" class="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm">
        ✅ Terima kasih <strong>{{ form.nama }}</strong>! Data Anda telah tersimpan. Panitia PPDB kami akan segera menghubungi Anda.
      </div>

      <form v-else @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap Siswa</label>
            <input v-model="form.nama" type="text" required placeholder="Sesuai ijazah SD" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">NISN</label>
            <input v-model="form.nisn" type="text" required placeholder="Nomor Induk Siswa Nasional" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Asal Sekolah (SD/MI)</label>
            <input v-model="form.asalSekolah" type="text" required placeholder="Nama SD asal" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">No. WhatsApp Orang Tua</label>
            <input v-model="form.hp" type="tel" required placeholder="08xxxxxxxxxx" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        <button type="submit" class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-colors">
          Kirim Data Pendaftaran
        </button>
      </form>
    </div>
  </div>
</template>