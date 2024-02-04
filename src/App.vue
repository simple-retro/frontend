<script setup lang="ts">
  import NotifyToast from './components/NotifyToast.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <div class="mb-10">
    <RouterView />
    <NotifyToast />
  </div>
</template>
