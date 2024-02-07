<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import BaseButton from '../components/BaseButton.vue';
  import { RouterLink } from 'vue-router';
  const route = useRoute();
</script>

<template>
  <div class="text-center">
    <h1 class="text-center font-extrabold text-4xl">
      An unexpected error has occured. <br />
      The retro could not continue
    </h1>

    <div class="flex flex-col gap-14">
      <span class="mt-10">Please return to your retrospective if the error does not repeat</span>
      <RouterLink
        :to="{ name: 'retrospective.view', params: { id: route.query.id?.toString() ?? '' } }"
        ><BaseButton>Get back to Retro</BaseButton></RouterLink
      >
    </div>
  </div>
</template>
