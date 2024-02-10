<script setup lang="ts">
  import NotifyToast from './components/NotifyToast.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <div class="mb-10">
    <NotifyToast class="fixed bottom-0 left-0 z-50 p-4" />
    <RouterView />
  </div>
</template>
