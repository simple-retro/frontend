<script setup lang="ts">
  import NotifyToast from './components/core/NotifyToast.vue';
  import FooterComponent from './components/core/FooterComponent.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <NotifyToast class="fixed bottom-0 left-0 z-50 p-4" />
    <div class="container grid mx-auto px-4 pt-8 md:pt-12 md:px-6 min-h-screen">
      <RouterView />
      <FooterComponent />
    </div>
  </div>
</template>
