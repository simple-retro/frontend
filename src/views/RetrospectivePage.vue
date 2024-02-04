<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRetrospectiveStore } from '../stores/retrospectiveStore';
  import { useWebsocketStore } from '../stores/websocketStore';

  const retroStore = useRetrospectiveStore();

  const websocket = useWebsocketStore();

  console.log(retroStore.retrospective?.id);
  websocket.connect(retroStore.retrospective!.id);

  const { retrospective } = storeToRefs(retroStore);
</script>

<template>
  <h1 class="text-4xl font-bold">Retrospectiva {{ retrospective?.name }}</h1>
</template>
