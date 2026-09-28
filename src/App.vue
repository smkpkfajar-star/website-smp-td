<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
    <TheNavbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
</script>