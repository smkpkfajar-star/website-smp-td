import { ref, computed } from 'vue'

// Satu-satunya tempat alamat API berada
const API_URL =
  import.meta.env.VITE_BERITA_API_URL || 'https://scrap-ig-apify-u55q.vercel.app/api/instagram/'

const CACHE_KEY = 'berita-cache-v1'

// Baca cache dari sesi sebelumnya supaya isi langsung tampil
function bacaCache() {
  try {
    const data = JSON.parse(sessionStorage.getItem(CACHE_KEY) || '[]')
    return Array.isArray(data) ? data : []
  } catch (e) {
    return []
  }
}

// State bersama (di luar fungsi, jadi dipakai semua halaman)
const posts = ref(bacaCache())
const loading = ref(posts.value.length === 0) // skeleton hanya bila belum ada data
const error = ref('')
const sudahMuat = ref(false)
let permintaan = null

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

function tentukanKategori(teks) {
  const t = teks.toLowerCase()
  if (/juara|trophy|prestasi/.test(t)) return 'Prestasi'
  if (/asesmen|belajar|pembelajaran|pelatihan|kokurikuler/.test(t)) return 'Akademik'
  if (/pengumuman|pendaftaran|spmb|ppdb/.test(t)) return 'Pengumuman'
  return 'Kegiatan'
}

// Tahan terhadap tanggal kosong/tidak valid
function formatTanggal(iso) {
  const d = new Date(iso)
  if (!iso || isNaN(d)) return ''
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

// posted_at bisa null, pakai created_at sebagai cadangan
const waktuPost = (p) => p.posted_at || p.created_at

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
    .sort((a, b) => new Date(waktuPost(b)) - new Date(waktuPost(a)))
    .map((p) => {
      const caption = p.caption || ''
      const baris = bersihkan(caption)
      const judul = kapital(baris[0] || 'Kabar dari sekolah')
      return {
        id: String(p.id),
        slug: buatSlug(judul),
        judul,
        isi: baris.slice(1),
        kategori: tentukanKategori(baris.join(' ')),
        tanggal: formatTanggal(waktuPost(p)),
        gambar: p.thumbnail_url,
        video: p.is_video,
        videoUrl: p.video_url,
        url: p.post_url || '',
        hashtag: [...new Set(caption.match(/#[\p{L}\p{N}_]+/gu) || [])],
        tautan: [...new Set(caption.match(/https?:\/\/\S+/g) || [])]
      }
    })
  return pastikanSlugUnik(daftar)
})

// Hanya memanggil API bila data belum ada. Panggilan bersamaan digabung jadi satu.
export function muatBerita(paksa = false) {
  if (sudahMuat.value && !paksa) return Promise.resolve()
  if (permintaan) return permintaan

  // Bila sudah ada data (dari cache), perbarui diam-diam tanpa skeleton
  loading.value = posts.value.length === 0
  error.value = ''
  permintaan = (async () => {
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      posts.value = Array.isArray(json.data) ? json.data : []
      sudahMuat.value = true
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(posts.value))
      } catch (e) {
        /* abaikan bila penyimpanan penuh */
      }
    } catch (e) {
      // Jangan tampilkan error bila data cache masih bisa dipakai
      if (!posts.value.length) error.value = 'Berita belum bisa dimuat. Coba lagi beberapa saat.'
    } finally {
      loading.value = false
      permintaan = null
    }
  })()
  return permintaan
}

export function useBerita() {
  return { beritaList, loading, error, muat: muatBerita }
}