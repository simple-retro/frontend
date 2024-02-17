<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { RouterLink } from 'vue-router';
  import BaseButton from '../components/core/BaseButton.vue';
  import QuestionIcon from '../components/icons/QuestionIcon.vue';
  const route = useRoute();
</script>
<template>
  <div class="text-center flex flex-col gap-6">
    <RouterLink :to="{ name: 'home' }">
      <img src="/logo_nobg.png" class="h-40 inline" />
    </RouterLink>
    <h1 class="text-3xl font-bold">Retrospective not found</h1>
    <p class="text-center">There is no retrospective with the ID {{ route.query.id }}</p>

    <div class="bg-gray-100 p-4 rounded-md flex items-center mx-auto">
      <QuestionIcon :size="24" />
      <span class="text-gray-700 font-semibold">
        TIP: You can press <kbd class="bg-gray-300 px-2 py-1 rounded-md">Ctrl</kbd> +
        <kbd class="bg-gray-300 px-2 py-1 rounded-md">Space</kbd> to navigate between retrospectives
      </span>
    </div>

    <RouterLink :to="{ name: 'retrospective.new' }">
      <BaseButton>Create a retrospective</BaseButton>
    </RouterLink>
  </div>
</template>
