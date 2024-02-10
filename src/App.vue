<script setup lang="ts">
  import NotifyToast from './components/core/NotifyToast.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <div class="mb-10">
    <NotifyToast class="fixed bottom-0 left-0 z-50 p-4" />
    <div class="container grid mx-auto gap-4 px-4 py-8 md:py-12 md:px-6">
      <RouterView />
    </div>
  </div>
</template>
