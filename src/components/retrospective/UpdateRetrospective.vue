<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../core/BaseButton.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { Retrospective, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import retrospectiveApi from '../../services/retrospectiveApi';
  import { useLimistStore } from '../../stores/limitsStore';
  import { storeToRefs } from 'pinia';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();
  const limitsStore = useLimistStore();

  const { limits } = storeToRefs(limitsStore);

  const isOpen = ref(false);

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

    const res = await retrospectiveApi.updateRetrospective({
      id: retrospective.id,
      description: updatedDescription.value,
      name: updatedName.value,
    });

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
    <div class="flex flex-col gap-2">
      <label for="name" class="text-md font-bold text-gray-900">Name</label>
      <input
        id="name"
        v-model="updatedName"
        :disabled="!limits"
        :maxlength="limits?.retrospective.name"
        rows="4"
        class="flex p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
        placeholder="When you were a child..."
      />

      <label for="description" class="text-md font-bold text-gray-900">Description</label>
      <textarea
        id="description"
        v-model="updatedDescription"
        :disabled="!limits"
        :maxlength="limits?.retrospective.description"
        rows="4"
        class="flex mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
        placeholder="Retrospective to talk about sprint 123, gather some feedback and be better!"
      />

      <BaseButton
        :disabled="
          updatedName.length < 5 ||
          !limits ||
          updatedName.length > limits.retrospective.name ||
          (updatedDescription && updatedDescription.length > limits.retrospective.description)
        "
        class="w-full"
        @click="updateRetrospective"
        >Update retrospective</BaseButton
      >
    </div>
  </ModalifyComponent>
</template>
