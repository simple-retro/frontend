<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../core/BaseButton.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { Retrospective, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import retrospectiveApi from '../../services/retrospectiveApi';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const isOpen = ref(false);

  const { retrospective } = defineProps<{
    retrospective: Retrospective;
  }>();

  const deleteRetrospective = async () => {
    const res = await retrospectiveApi.deleteRestrospective(retrospective.id);

    if (res?.error)
      return notifyStore.notify(
        'An error occured to delete the retrospective',
        NotificationType.Error,
      );

    retroStore.retrospective.deleteRetrospective();

    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <ModalifyComponent v-if="isOpen" @close="isOpen = !isOpen">
    <div class="flex flex-col gap-6">
      <h3>Are you sure you want to delete the entire retrospective?</h3>
      <div class="flex flex-row gap-4">
        <BaseButton @click="deleteRetrospective">Delete</BaseButton>
        <BaseButton @click="isOpen = !isOpen">Cancel</BaseButton>
      </div>
    </div>
  </ModalifyComponent>

  <BaseButton @click="isOpen = !isOpen"><span>Delete retrospective</span></BaseButton>
</template>
