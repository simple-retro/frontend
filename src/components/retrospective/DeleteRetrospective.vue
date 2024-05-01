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

  const props = defineProps<{
    retrospective: Retrospective;
  }>();

  const deleteRetrospective = async () => {
    const res = await retrospectiveApi.deleteRestrospective(props.retrospective.id);

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
      <p class="block text-md font-bold text-gray-900">Delete retrospective?</p>
      <span>
        Are you sure you want to delete the entire retrospective? This action can't be undone
      </span>
      <div class="flex flex-row gap-2 justify-end">
        <BaseButton @click="isOpen = !isOpen">Cancel</BaseButton>
        <BaseButton :style="'RED'" @click="deleteRetrospective">Delete</BaseButton>
      </div>
    </div>
  </ModalifyComponent>

  <BaseButton class="font-bold" :style="'RED'" @click="isOpen = !isOpen">
    Delete retrospective
  </BaseButton>
</template>
