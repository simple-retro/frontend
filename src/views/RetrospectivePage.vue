<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRetrospectiveStore } from '../stores/retrospectiveStore';
  const retroStore = useRetrospectiveStore();

  const { retrospective } = storeToRefs(retroStore);
</script>

<template>
  <h1 class="text-4xl font-bold">Retrospectiva {{ retrospective?.name }}</h1>
</template>
