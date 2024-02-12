<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRetrospectiveStore } from '../stores/retrospectiveStore';
  import KnownRetros from '../components/core/KnownRetros.vue';
  import { onMounted, ref } from 'vue';
  import BaseButton from '../components/core/BaseButton.vue';
  import { RouterLink } from 'vue-router';
  import ShortcutModal from '../components/core/ShortcutModal.vue';

  const jumpToRetro = ref();

  const retroStore = useRetrospectiveStore();

  onMounted(() => {
    retroStore.getKnownRetrospectives();
  });

  const { knownRetros } = storeToRefs(retroStore);

  const openShortcutModal = () => {
    if (jumpToRetro.value) jumpToRetro.value.openModal();
  };
</script>

<template>
  <ShortcutModal ref="jumpToRetro" />

  <div class="min-h-screen">
    <div class="text-center">
      <img src="/logo_nobg.png" class="h-40 inline" />
      <h1 class="mt-4 text-4xl font-bold">Simple Retro</h1>
    </div>

    <div class="mt-10">
      <p>
        Simple Retro is a user-friendly website designed to facilitate Scrum Retrospective meetings.
        This tool is aimed at Agile teams practicing Scrum methodology, providing them with a
        platform to conduct effective retrospectives in a straightforward manner.
      </p>
    </div>

    <div class="flex gap-2 justify-center mt-10">
      <RouterLink :to="{ name: 'retrospective.new' }"
        ><BaseButton>Create retrospective</BaseButton></RouterLink
      >
      <BaseButton @click="openShortcutModal">Join a retrospective</BaseButton>
    </div>

    <div v-if="knownRetros && knownRetros.length > 0">
      <KnownRetros :retros="knownRetros" />
    </div>
  </div>
</template>
