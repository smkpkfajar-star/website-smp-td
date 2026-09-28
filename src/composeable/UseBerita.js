import { ref, computed } from 'vue'

// Ganti dengan alamat endpoint Anda, atau isi VITE_BERITA_API_URL di file .env
const API_URL = import.meta.env.VITE_BERITA_API_URL || '/api/berita'

// State dipakai bersama, jadi pindah dari daftar ke detail tidak memuat ulang data
const posts = ref([])
const loading = ref(true)
const error = ref('')
let sudahDimuat = false

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

const beritaList = computed(() =>
  [...posts.value]
    .sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at))
    .map((p) => {
      const caption = p.caption || ''
      const baris = bersihkan(caption)
      return {
        id: String(p.id),
        judul: kapital(baris[0] || 'Kabar dari sekolah'),
        ringkasan: baris.slice(1).join(' '),
        isi: baris.slice(1),
        kategori: tentukanKategori(baris.join(' ')),
        tanggal: formatTanggal(p.posted_at),
        gambar: p.thumbnail_url,
        video: p.is_video,
        videoUrl: p.video_url,
        url: p.post_url,
        hashtag: [...new Set(caption.match(/#[\p{L}\p{N}_]+/gu) || [])],
        tautan: [...new Set(caption.match(/https?:\/\/\S+/g) || [])]
      }
    })
)

async function muat(paksa = false) {
  if (sudahDimuat && paksa !== true) return
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    posts.value = Array.isArray(json.data) ? json.data : []
    sudahDimuat = true
  } catch (e) {
    error.value = 'Berita belum bisa dimuat. Coba lagi beberapa saat.'
  } finally {
    loading.value = false
  }
}

export const warnaKategori = {
  Pengumuman: 'bg-amber-100 text-amber-800',
  Prestasi: 'bg-emerald-100 text-emerald-800',
  Akademik: 'bg-sky-100 text-sky-800',
  Kegiatan: 'bg-orange-100 text-orange-800'
}

export function useBerita() {
  return { beritaList, loading, error, muat }
}