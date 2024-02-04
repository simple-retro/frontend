<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { RouterLink } from 'vue-router';
  import BaseButton from '../components/BaseButton.vue';
  const route = useRoute();
</script>
<template>
  <div class="text-center">
    <h1 class="text-center">There is no existing retro with ID {{ route.query.id }}</h1>
    <RouterLink :to="{ name: 'retrospective.new' }">
      <BaseButton class="mt-10">Crete a retrospective</BaseButton>
    </RouterLink>
  </div>
</template>
