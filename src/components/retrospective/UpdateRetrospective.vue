<script setup lang="ts">
  import { ref } from 'vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { Retrospective, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import retrospectiveApi from '../../services/retrospectiveApi';
  import RetrospectiveInputs from './RetrospectiveInputs.vue';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const isOpen = ref(false);
  const disableInteraction = ref(false);

  const { retrospective } = defineProps<{
    retrospective: Retrospective;
  }>();

  const updatedName = ref(retrospective.name);
  const updatedDescription = ref(retrospective.description);

  const toggleModal = () => {
    isOpen.value = !isOpen.value;
  };

  const updateRetrospective = async () => {
    if (
      updatedName.value === retrospective.name &&
      updatedDescription.value === retrospective.description
    ) {
      isOpen.value = !isOpen.value;
      return;
    }

    disableInteraction.value = true;
    const res = await retrospectiveApi.updateRetrospective({
      id: retrospective.id,
      description: updatedDescription.value,
      name: updatedName.value,
    });
    disableInteraction.value = false;

    if (res.error)
      return notifyStore.notify(
        'An error occured when updating the retrospective',
        NotificationType.Error,
      );

    retroStore.retrospective.updateRetrospective(res);

    isOpen.value = !isOpen.value;
  };

  defineExpose({ toggleModal });
</script>

<template>
  <ModalifyComponent v-if="isOpen" @close="toggleModal">
    <RetrospectiveInputs
      button-label="Update retrospective"
      :retro-name="updatedName"
      :disabled="disableInteraction"
      :retro-description="updatedDescription"
      @clicked="updateRetrospective"
      @update:retro-name="($event) => (updatedName = $event)"
      @update:retro-description="($event) => (updatedDescription = $event)"
    />
  </ModalifyComponent>
</template>
