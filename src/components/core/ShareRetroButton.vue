<script setup lang="ts">
  import logger from '../../services/logger';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import ShareIcon from '../icons/ShareIcon.vue';
  import BaseButton from './BaseButton.vue';

  const notifyStore = useNotifyStore();
  const retroStore = useRetrospectiveStore();

  const getRetroLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/retrospective/${retroStore.currentRetro?.id}`,
      );

      notifyStore.notify('Retrospective URL copied to clipboard', NotificationType.Success);
    } catch (e) {
      logger.error('Error when copying retro URL', e);
      notifyStore.notify('There was an error when copying the URL', NotificationType.Error);
    }
  };
</script>

<template>
  <BaseButton class="font-bold flex gap-2" :style="'WHITE'" @click="getRetroLink">
    <ShareIcon :size="18" /> Share
  </BaseButton>
</template>
