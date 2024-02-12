<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { RouterLink } from 'vue-router';
  import BaseButton from '../components/core/BaseButton.vue';
  const route = useRoute();
</script>
<template>
  <div class="text-center flex flex-col gap-6">
    <RouterLink :to="{ name: 'home' }">
      <img src="/logo_nobg.png" class="h-40 inline" />
    </RouterLink>
    <h1 class="text-3xl font-bold">Retrospective not found</h1>
    <p class="text-center">There is no existing retro with ID {{ route.query.id }}</p>
    <RouterLink :to="{ name: 'retrospective.new' }">
      <BaseButton>Create a retrospective</BaseButton>
    </RouterLink>
  </div>
</template>
