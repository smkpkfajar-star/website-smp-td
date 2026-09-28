import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading komponen halaman
const HomeView = () => import('../views/HomeView.vue')
const ProfilView = () => import('../views/ProfilView.vue')
const EkstrakurikulerView = () => import('../views/EkstrakulikulerView.vue')
const BeritaView = () => import('../views/BeritaView.vue')
const BeritaDetailView = () => import('../views/BeritadetailView.vue')
const SpmbView = () => import('../views/SpmbView.vue')
const KontakView = () => import('../views/KontakView.vue')

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/profil', name: 'profil', component: ProfilView },
  { path: '/ekstrakurikuler', name: 'ekstrakurikuler', component: EkstrakurikulerView },
  { path: '/berita', name: 'berita', component: BeritaView },
  { path: '/berita/:slug', name: 'berita-detail', component: BeritaDetailView },
  { path: '/spmb', name: 'spmb', component: SpmbView },
  { path: '/kontak', name: 'kontak', component: KontakView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Setiap pindah halaman, mulai dari atas
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router