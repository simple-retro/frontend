<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRetrospectiveStore } from '../stores/retrospectiveStore';
  import KnownRetros from '../components/core/KnownRetros.vue';
  import { onMounted } from 'vue';

  const retroStore = useRetrospectiveStore();

  onMounted(() => {
    retroStore.getKnownRetrospectives();
  });

  const { knownRetros } = storeToRefs(retroStore);
</script>

<template>
  <div class="min-h-screen">
    <div class="text-center">
      <img
        src="https://2.bp.blogspot.com/-5xvOsHhp-jw/WEdhxnTeN0I/AAAAAAAABbs/Xs_aOfeOx2wFFgLAH0_ZZwhFIiKb3WbvwCLcB/s1600/umaru%252Bgolang.png"
        class="h-45 inline"
      />
      <h1 class="mt-4 text-4xl font-bold">Simple Retro</h1>
    </div>

    <div class="mt-10">
      <p>
        Simple Retro is a user-friendly website designed to facilitate Scrum Retrospective meetings.
        This tool is aimed at Agile teams practicing Scrum methodology, providing them with a
        platform to conduct effective retrospectives in a straightforward manner.
      </p>
    </div>

    <div v-if="knownRetros && knownRetros.length > 0">
      <KnownRetros :retros="knownRetros" />
    </div>
  </div>
</template>
