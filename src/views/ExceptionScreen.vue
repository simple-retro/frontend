<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import BaseButton from '../components/core/BaseButton.vue';
  import { RouterLink } from 'vue-router';
  const route = useRoute();
</script>

<template>
  <div class="text-center flex flex-col gap-6">
    <RouterLink :to="{ name: 'home' }">
      <img src="/logo_nobg.png" class="h-40 inline" />
    </RouterLink>
    <h1 class="text-3xl font-bold">Oopsie!</h1>
    <p class="text-center">
      An unexpected error has occured. <br />
      The retro could not continue.
    </p>
    <div class="flex flex-col gap-4">
      <span>Please return to your retrospective if the error does not repeat.</span>
      <RouterLink
        :to="{ name: 'retrospective.view', params: { id: route.query.id?.toString() ?? '' } }"
      >
        <BaseButton>Back to retrospective</BaseButton>
      </RouterLink>
    </div>
  </div>
  <div class="text-center">
    <h1 class="text-center font-extrabold text-4xl"></h1>
  </div>
</template>
