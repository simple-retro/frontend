<script setup lang="ts">
  import { useRetrospectiveStore } from '../stores/retrospectiveStore';
  import { useWebsocketStore } from '../stores/websocketStore';
  import ReconnectingFeedback from '../components/core/ReconnectingFeedback.vue';
  import { storeToRefs } from 'pinia';

  const retroStore = useRetrospectiveStore();

  const websocketStore = useWebsocketStore();

  const { isReconnecting } = storeToRefs(websocketStore);

  websocketStore.connect(retroStore.currentRetro!.id);
</script>

<template>
  <Transition name="fade">
    <ReconnectingFeedback v-if="isReconnecting" />
  </Transition>
  <RouterView />
</template>
