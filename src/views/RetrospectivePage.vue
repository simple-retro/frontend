<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRetrospectiveStore } from '../stores/retrospectiveStore';
  import { useWebsocketStore } from '../stores/websocketStore';

  const retroStore = useRetrospectiveStore();

  const websocket = useWebsocketStore();

  websocket.connect(retroStore.currentRetro!.id);

  const { currentRetro } = storeToRefs(retroStore);
</script>

<template>
  <h1 class="text-4xl font-bold">Retrospectiva {{ currentRetro?.name }}</h1>
</template>
