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

  const updatedName = ref(retrospective.name);
  const updatedDescription = ref(retrospective.description);

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
</script>

<template>
  <ModalifyComponent v-if="isOpen" @close="isOpen = !isOpen">
    <div class="flex flex-col gap-6">
      <h3>Update the retrospective</h3>

      <div class="flex flex-col border-b-2">
        <label for="name" class="border-b-2">Retrospective name </label>
        <input id="name" v-model="updatedName" class="box-border border-black" placeholder="Name" />
      </div>

      <div class="flex flex-col">
        <label for="description" class="border-b-2">Retrospective description </label>
        <textarea
          id="description"
          v-model="updatedDescription"
          class="border-b-2"
          cols="30"
          rows="10"
          placeholder="Description"
        />
      </div>

      <div class="flex flex-row gap-4">
        <BaseButton @click="updateRetrospective">Update</BaseButton>
        <BaseButton @click="isOpen = !isOpen">Cancel</BaseButton>
      </div>
    </div>
  </ModalifyComponent>

  <BaseButton @click="isOpen = !isOpen"><span>Update retrospective</span></BaseButton>
</template>
