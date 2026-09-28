<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { useBerita } from '../composables/UseBerita'

const route = useRoute()
const router = useRouter()

// Data dipakai bersama halaman berita; API hanya dipanggil bila belum ada
const { beritaList, loading, error, muat } = useBerita()

const gambarRusak = ref([])
const videoGagal = ref(false)
const tersalin = ref(false)

const warnaKategori = {
  Pengumuman: 'bg-amber-100 text-amber-800',
  Prestasi: 'bg-emerald-100 text-emerald-800',
  Akademik: 'bg-sky-100 text-sky-800',
  Kegiatan: 'bg-orange-100 text-orange-800'
}

// Alamat memakai judul (slug). Alamat lama berbasis id tetap dikenali.
const item = computed(() =>
  beritaList.value.find((b) => b.slug === route.params.slug || b.id === route.params.slug)
)
const lainnya = computed(() => beritaList.value.filter((b) => b.id !== item.value?.id).slice(0, 3))

const deskripsi = computed(
  () => item.value?.isi.join(' ').slice(0, 200) || 'Kabar terbaru dari sekolah.'
)

useSeoMeta({
  title: () => item.value?.judul ?? 'Berita',
  description: () => deskripsi.value,
  ogType: 'article',
  ogTitle: () => item.value?.judul ?? 'Berita',
  ogDescription: () => deskripsi.value,
  ogImage: () =>
    item.value ? `${window.location.origin}/api/og-image?slug=${item.value.slug}` : undefined,
  ogUrl: () => (item.value ? `${window.location.origin}/berita/${item.value.slug}` : undefined),
  twitterCard: 'summary_large_image'
})

function adaGambar(b) {
  return b.gambar && !gambarRusak.value.includes(b.id)
}

async function salinTautan() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    tersalin.value = true
    setTimeout(() => (tersalin.value = false), 2000)
  } catch (e) {
    /* abaikan bila browser menolak akses clipboard */
  }
}

watch(
  () => route.params.slug,
  () => {
    videoGagal.value = false
    window.scrollTo({ top: 0 })
  }
)

// Kalau dibuka lewat alamat lama (id), arahkan ke alamat berjudul
watch(item, (b) => {
  if (b && route.params.slug !== b.slug) router.replace(`/berita/${b.slug}`)
})

// Tidak memanggil API bila data sudah dimuat halaman berita
onMounted(() => muat())
</script>

<template>
  <div class="detail bg-[#FBF9F4] text-[#0F3B29]">
    <!-- Judul berita -->
    <section class="relative overflow-hidden bg-[#0F3B29] px-6 py-14 text-[#FBF9F4]">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(#16523A_1px,transparent_1px)] opacity-40 [background-size:24px_24px]"></div>
      <div class="relative mx-auto max-w-3xl">
        <router-link to="/berita" class="inline-flex items-center gap-2 text-sm text-[#FBF9F4]/70 transition hover:text-[#FBF9F4]">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke berita
        </router-link>

        <div v-if="item" :key="item.id" class="fade-in">
          <div class="mt-6 flex items-center gap-3">
            <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="warnaKategori[item.kategori]">
              {{ item.kategori }}
            </span>
            <span class="text-sm text-[#FBF9F4]/60">{{ item.tanggal }}</span>
          </div>
          <h1 class="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">{{ item.judul }}</h1>
        </div>

        <div v-else-if="loading" aria-hidden="true">
          <div class="mt-6 flex items-center gap-3">
            <div class="h-6 w-20 animate-pulse rounded-full bg-[#FBF9F4]/15"></div>
            <div class="h-4 w-28 animate-pulse rounded bg-[#FBF9F4]/15"></div>
          </div>
          <div class="mt-4 space-y-3">
            <div class="h-9 w-full animate-pulse rounded bg-[#FBF9F4]/15"></div>
            <div class="h-9 w-2/3 animate-pulse rounded bg-[#FBF9F4]/15"></div>
          </div>
        </div>
      </div>
    </section>

    <div class="mx-auto max-w-3xl px-6 py-12">
      <!-- Memuat -->
      <div v-if="loading" class="space-y-6" aria-busy="true">
        <div class="h-96 animate-pulse rounded-3xl bg-[#E2DDD0]/70"></div>
        <div class="h-4 w-full animate-pulse rounded bg-[#E2DDD0]/70"></div>
        <div class="h-4 w-2/3 animate-pulse rounded bg-[#E2DDD0]/70"></div>
      </div>

      <!-- Gagal -->
      <div v-else-if="error" class="rounded-2xl border border-[#E2DDD0] bg-white p-10 text-center">
        <p class="font-semibold">{{ error }}</p>
        <button type="button" class="mt-4 rounded-xl bg-[#16523A] px-6 py-3 font-semibold text-[#FBF9F4] transition hover:bg-[#0F3B29]" @click="muat(true)">
          Muat ulang
        </button>
      </div>

      <!-- Tidak ditemukan -->
      <div v-else-if="!item" class="rounded-2xl border border-[#E2DDD0] bg-white p-10 text-center">
        <p class="font-semibold">Berita tidak ditemukan.</p>
        <router-link to="/berita" class="mt-4 inline-block rounded-xl bg-[#16523A] px-6 py-3 font-semibold text-[#FBF9F4] transition hover:bg-[#0F3B29]">
          Lihat semua berita
        </router-link>
      </div>

      <article v-else :key="item.id" class="fade-in">
        <!-- Media -->
        <div class="min-h-[16rem] overflow-hidden rounded-3xl border border-[#E2DDD0] bg-[#E2DDD0]/50">
          <video
            v-if="item.video && item.videoUrl && !videoGagal"
            :key="item.id"
            :src="item.videoUrl"
            :poster="item.gambar"
            controls
            playsinline
            preload="metadata"
            class="mx-auto block max-h-[36rem] w-full bg-black"
            @error="videoGagal = true"
          ></video>
          <img
            v-else-if="adaGambar(item)"
            :src="item.gambar"
            :alt="item.judul"
            referrerpolicy="no-referrer"
            class="mx-auto block max-h-[36rem] w-auto max-w-full object-contain"
            @error="gambarRusak.push(item.id)"
          />
          <div v-else class="flex aspect-video items-center justify-center text-sm text-[#0F3B29]/40">
            Cover berita
          </div>
        </div>
        <p v-if="item.video && videoGagal" class="mt-3 text-sm text-[#0F3B29]/60">
          Video tidak dapat diputar di halaman ini. Buka postingan aslinya di Instagram untuk menontonnya.
        </p>

        <!-- Isi berita -->
        <div class="mt-10 space-y-5 text-lg leading-relaxed text-[#0F3B29]/85">
          <p v-for="(p, i) in item.isi" :key="i">{{ p }}</p>
          <p v-if="!item.isi.length" class="text-[#0F3B29]/60">Berita ini hanya memuat foto atau video. Selengkapnya ada di postingan asli.</p>
        </div>

        <!-- Tautan terkait -->
        <div v-if="item.tautan.length" class="mt-8 rounded-2xl border border-[#E2DDD0] bg-white p-5">
          <p class="text-sm font-semibold">Tautan terkait</p>
          <ul class="mt-2 space-y-1">
            <li v-for="t in item.tautan" :key="t">
              <a :href="t" target="_blank" rel="noopener noreferrer" class="break-all text-sm text-[#16523A] hover:underline">{{ t }}</a>
            </li>
          </ul>
        </div>

        <!-- Hashtag -->
        <div v-if="item.hashtag.length" class="mt-8 flex flex-wrap gap-2">
          <span v-for="h in item.hashtag" :key="h" class="rounded-full bg-[#E2DDD0]/60 px-3 py-1 text-xs font-medium text-[#0F3B29]/70">
            {{ h }}
          </span>
        </div>

        <!-- Aksi -->
        <div class="mt-10 flex flex-wrap gap-3 border-t border-[#E2DDD0] pt-8">
          <a
            v-if="item.url"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-xl bg-[#16523A] px-6 py-3 font-semibold text-[#FBF9F4] transition hover:bg-[#0F3B29]"
          >
            Lihat di Instagram
          </a>
          <button
            type="button"
            class="rounded-xl border border-[#16523A]/30 px-6 py-3 font-semibold text-[#16523A] transition hover:bg-[#16523A]/5"
            @click="salinTautan"
          >
            {{ tersalin ? 'Tautan tersalin' : 'Salin tautan' }}
          </button>
        </div>
      </article>
    </div>

    <!-- Berita lainnya -->
    <section v-if="item && lainnya.length" class="bg-white py-16">
      <div class="mx-auto max-w-6xl px-6">
        <h2 class="text-2xl font-bold">Berita lainnya</h2>
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <router-link
            v-for="b in lainnya"
            :key="b.id"
            :to="`/berita/${b.slug}`"
            class="group flex flex-col overflow-hidden rounded-2xl border border-[#E2DDD0] bg-[#FBF9F4] transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="aspect-[16/10] overflow-hidden bg-[#E2DDD0]/60">
              <img
                v-if="adaGambar(b)"
                :src="b.gambar"
                :alt="b.judul"
                loading="lazy"
                referrerpolicy="no-referrer"
                class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                @error="gambarRusak.push(b.id)"
              />
              <div v-else class="flex h-full items-center justify-center text-sm text-[#0F3B29]/40">Cover berita</div>
            </div>
            <div class="p-5">
              <div class="flex items-center justify-between gap-2">
                <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="warnaKategori[b.kategori]">{{ b.kategori }}</span>
                <span class="text-xs text-[#0F3B29]/50">{{ b.tanggal }}</span>
              </div>
              <h3 class="mt-3 line-clamp-2 font-bold leading-snug group-hover:text-[#16523A]">{{ b.judul }}</h3>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.detail {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

.fade-in {
  animation: fade-in 0.35s ease-out both;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>