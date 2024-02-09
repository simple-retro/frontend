<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useRetrospectiveStore } from '../stores/retrospectiveStore';
  import { useWebsocketStore } from '../stores/websocketStore';
  import RetrospectiveLayout from '../components/retrospective/RetrospectiveLayout.vue';

  const retroStore = useRetrospectiveStore();

  const websocket = useWebsocketStore();
  websocket.connect(retroStore.currentRetro!.id);

  const { currentRetro } = storeToRefs(retroStore);
</script>

<template>
  <RetrospectiveLayout v-if="currentRetro" :retrospective="currentRetro" />
</template>
