<script setup lang="ts">
  import { ref } from 'vue';
  import logger from '../../services/logger';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import ShareIcon from '../icons/ShareIcon.vue';
  import ModalifyComponent from './ModalifyComponent.vue';
  import PageDivider from './PageDivider.vue';
  import BaseButton from './BaseButton.vue';

  const notifyStore = useNotifyStore();
  const retroStore = useRetrospectiveStore();

  const showModal = ref(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      notifyStore.notify('Copied to clipboard!', NotificationType.Success);
      showModal.value = false;
    } catch (e) {
      logger.error('Error when copying to clipboard', e);
      notifyStore.notify('There was an error when copying the clipboard', NotificationType.Error);
    }
  };

  const retroLink = `${window.location.origin}/retrospective/${retroStore.currentRetro?.id}`;

  const getRetroLink = () => {
    copyToClipboard(retroLink);
  };

  const getRetroId = () => {
    copyToClipboard(`${retroStore.currentRetro?.id}`);
  };
</script>

<template>
  <ModalifyComponent v-if="showModal" @close="showModal = false">
    <h1 class="text-2xl mb-5 cursor-default font-bold">Share the retrospective</h1>
    <div class="cursor-pointer" @click="getRetroLink">
      <label class="text-md font-bold cursor-pointer text-gray-900">
        Click to copy the retrospective URL
      </label>
      <input
        type="text"
        :value="retroLink"
        class="flex cursor-pointer p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
      />
    </div>
    <PageDivider class="my-3" />
    <div class="cursor-pointer" @click="getRetroId">
      <label class="text-md cursor-pointer font-bold text-gray-900">
        Click to copy the retro ID
      </label>
      <input
        type="text"
        :value="retroStore.currentRetro?.id"
        class="flex cursor-pointer p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
      />
    </div>
  </ModalifyComponent>

  <BaseButton class="font-bold flex gap-2" :style="'WHITE'" @click="showModal = true">
    <ShareIcon :size="18" /> Share
  </BaseButton>
</template>
