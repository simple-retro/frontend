<script setup lang="ts">
  import { useRetrospectiveStore } from '../stores/retrospectiveStore';
  import { useWebsocketStore } from '../stores/websocketStore';

  const retroStore = useRetrospectiveStore();
  const websocketStore = useWebsocketStore();

  websocketStore.connect(retroStore.currentRetro!.id);
</script>

<template>
  <RouterView />
</template>
