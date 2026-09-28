<script setup>
import { ref, computed, onMounted } from 'vue'

// Ganti dengan alamat endpoint Anda, atau isi VITE_BERITA_API_URL di file .env
const API_URL =
  import.meta.env.VITE_BERITA_API_URL || 'https://scrap-ig-apify-u55q.vercel.app/api/instagram/'

const posts = ref([])
const loading = ref(true)
const error = ref('')
const gambarRusak = ref([])

const warnaKategori = {
  Pengumuman: 'bg-amber-100 text-amber-800',
  Prestasi: 'bg-emerald-100 text-emerald-800',
  Akademik: 'bg-sky-100 text-sky-800',
  Kegiatan: 'bg-orange-100 text-orange-800'
}

const RE_EMOJI = /[\p{Extended_Pictographic}\uFE0F\u200D]/gu

// Caption Instagram -> daftar baris teks yang bersih
function bersihkan(caption = '') {
  return caption
    .replace(/https?:\/\/\S+/g, '')
    .replace(/#\S+/g, '')
    .replace(/@/g, '')
    .replace(RE_EMOJI, '')
    .replace(/^\s*salam dan bahagia[\s,.!]*/i, '')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter((l) => l && !/^[.\-_•]+$/.test(l))
}

function kapital(teks) {
  return teks.charAt(0).toUpperCase() + teks.slice(1)
}

// Kategori ditebak dari isi caption. Ubah kata kunci di sini kalau perlu.
function tentukanKategori(teks) {
  const t = teks.toLowerCase()
  if (/juara|trophy|prestasi/.test(t)) return 'Prestasi'
  if (/asesmen|belajar|pembelajaran|pelatihan|kokurikuler/.test(t)) return 'Akademik'
  if (/pengumuman|pendaftaran|spmb|ppdb/.test(t)) return 'Pengumuman'
  return 'Kegiatan'
}

function formatTanggal(iso) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

function buatSlug(teks) {
  const s = teks
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' dan ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return s.length <= 70 ? s : s.slice(0, 70).replace(/-[^-]*$/, '')
}

// Judul kembar diberi akhiran angka dari id supaya alamatnya tetap unik
function pastikanSlugUnik(daftar) {
  const hitung = {}
  daftar.forEach((b) => (hitung[b.slug] = (hitung[b.slug] || 0) + 1))
  return daftar.map((b) =>
    !b.slug || hitung[b.slug] > 1 ? { ...b, slug: `${b.slug || 'berita'}-${b.id.slice(-4)}` } : b
  )
}

const beritaList = computed(() => {
  const daftar = [...posts.value]
    .sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at))
    .map((p) => {
      const baris = bersihkan(p.caption)
      const judul = kapital(baris[0] || 'Kabar dari sekolah')
      return {
        id: String(p.id),
        slug: buatSlug(judul),
        judul,
        ringkasan: baris.slice(1).join(' '),
        kategori: tentukanKategori(baris.join(' ')),
        tanggal: formatTanggal(p.posted_at),
        gambar: p.thumbnail_url,
        video: p.is_video
      }
    })
  return pastikanSlugUnik(daftar)
})

const featured = computed(() => beritaList.value[0])
const rest = computed(() => beritaList.value.slice(1))

function adaGambar(item) {
  return item.gambar && !gambarRusak.value.includes(item.id)
}

async function muat() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    posts.value = Array.isArray(json.data) ? json.data : []
  } catch (e) {
    error.value = 'Berita belum bisa dimuat. Coba lagi beberapa saat.'
  } finally {
    loading.value = false
  }
}

onMounted(muat)
</script>

<template>
  <div class="berita bg-[#FBF9F4] text-[#0F3B29]">
    <!-- Judul halaman -->
    <section class="relative overflow-hidden bg-[#0F3B29] px-6 py-16 text-[#FBF9F4]">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#16523A_1px,transparent_1px)] opacity-40 [background-size:24px_24px]"></div>
      <div class="relative mx-auto max-w-6xl">
        <h1 class="text-3xl font-extrabold md:text-4xl">Berita dan Pengumuman</h1>
        <p class="mt-3 max-w-xl text-[#FBF9F4]/70">
          Informasi seputar agenda, prestasi, dan kegiatan sekolah terkini.
        </p>
      </div>
    </section>

    <div class="mx-auto max-w-6xl space-y-8 px-6 py-14">
      <!-- Memuat -->
      <div v-if="loading" class="space-y-8" aria-busy="true">
        <div class="h-72 animate-pulse rounded-3xl bg-[#E2DDD0]/70"></div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 3" :key="n" class="h-80 animate-pulse rounded-2xl bg-[#E2DDD0]/70"></div>
        </div>
      </div>

      <!-- Gagal -->
      <div v-else-if="error" class="rounded-2xl border border-[#E2DDD0] bg-white p-10 text-center">
        <p class="font-semibold">{{ error }}</p>
        <button type="button" class="mt-4 rounded-xl bg-[#16523A] px-6 py-3 font-semibold text-[#FBF9F4] transition hover:bg-[#0F3B29]" @click="muat">
          Muat ulang
        </button>
      </div>

      <!-- Kosong -->
      <div v-else-if="!featured" class="rounded-2xl border border-[#E2DDD0] bg-white p-10 text-center text-[#0F3B29]/70">
        Belum ada berita.
      </div>

      <template v-else>
        <!-- Berita utama -->
        <article class="relative grid overflow-hidden rounded-3xl bg-[#16523A] text-[#FBF9F4] shadow-xl shadow-[#0F3B29]/15 md:grid-cols-2">
          <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#FBF9F4_1px,transparent_1px)] opacity-10 [background-size:24px_24px]"></div>

          <div class="relative flex flex-col justify-center p-8 md:p-10">
            <div class="flex items-center gap-3">
              <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="warnaKategori[featured.kategori]">
                {{ featured.kategori }}
              </span>
              <span class="text-sm text-[#FBF9F4]/60">{{ featured.tanggal }}</span>
            </div>
            <h2 class="mt-5 text-2xl font-bold leading-snug md:text-3xl">{{ featured.judul }}</h2>
            <p v-if="featured.ringkasan" class="mt-3 line-clamp-4 text-[#FBF9F4]/75">{{ featured.ringkasan }}</p>
            <router-link
              :to="`/berita/${featured.slug}`"
              class="mt-6 w-fit rounded-xl bg-[#FBF9F4] px-6 py-3 font-semibold text-[#0F3B29] transition hover:bg-[#E2DDD0]"
            >
              Baca selengkapnya
            </router-link>
          </div>

          <div class="relative min-h-[15rem] md:min-h-[22rem]">
            <img
              v-if="adaGambar(featured)"
              :src="featured.gambar"
              :alt="featured.judul"
              referrerpolicy="no-referrer"
              class="absolute inset-0 h-full w-full object-cover"
              @error="gambarRusak.push(featured.id)"
            />
            <div v-else class="absolute inset-0 flex items-center justify-center bg-[#0F3B29]/40 text-sm text-[#FBF9F4]/60">
              Cover berita
            </div>
            <div v-if="featured.video" class="absolute inset-0 flex items-center justify-center">
              <span class="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 text-white">
                <svg class="ml-0.5 h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </div>
          </div>
        </article>

        <!-- Berita lainnya -->
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <router-link
            v-for="item in rest"
            :key="item.id"
            :to="`/berita/${item.slug}`"
            class="group flex flex-col overflow-hidden rounded-2xl border border-[#E2DDD0] bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-[#E2DDD0]/60">
              <img
                v-if="adaGambar(item)"
                :src="item.gambar"
                :alt="item.judul"
                loading="lazy"
                referrerpolicy="no-referrer"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                @error="gambarRusak.push(item.id)"
              />
              <div v-else class="flex h-full items-center justify-center text-sm text-[#0F3B29]/40">
                Cover berita
              </div>
              <div v-if="item.video" class="absolute inset-0 flex items-center justify-center">
                <span class="flex h-12 w-12 items-center justify-center rounded-full bg-black/45 text-white">
                  <svg class="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </div>
            </div>

            <div class="flex flex-1 flex-col p-6">
              <div class="flex items-center justify-between gap-2">
                <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="warnaKategori[item.kategori]">
                  {{ item.kategori }}
                </span>
                <span class="text-xs text-[#0F3B29]/50">{{ item.tanggal }}</span>
              </div>
              <h3 class="mt-4 line-clamp-3 text-lg font-bold leading-snug group-hover:text-[#16523A]">{{ item.judul }}</h3>
              <p v-if="item.ringkasan" class="mt-2 line-clamp-3 flex-1 text-sm text-[#0F3B29]/70">{{ item.ringkasan }}</p>
              <span v-else class="flex-1"></span>
              <span class="mt-4 text-sm font-semibold text-[#16523A] group-hover:underline">Baca selengkapnya</span>
            </div>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.berita {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}
</style>