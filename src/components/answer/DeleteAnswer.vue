<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../BaseButton.vue';
  import ModalifyComponent from '../ModalifyComponent.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { Answer, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import answerApi from '../../services/answerApi';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const isOpen = ref(false);

  const { answer } = defineProps<{
    answer: Answer;
  }>();

  const deleteAnswer = async () => {
    const res = await answerApi.deleteAnswer(answer.id);

    if (res?.error)
      return notifyStore.notify('An error occured to delete the answer', NotificationType.Error);

    retroStore.answer.deleteAnswer(answer);

    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <ModalifyComponent v-if="isOpen" @close="isOpen = !isOpen">
    <div class="flex flex-col gap-6">
      <h3>Are you sure you want to delete this answer?</h3>
      <div class="flex flex-row gap-4">
        <BaseButton @click="deleteAnswer">Delete</BaseButton>
        <BaseButton @click="isOpen = !isOpen">Cancel</BaseButton>
      </div>
    </div>
  </ModalifyComponent>

  <BaseButton @click="isOpen = !isOpen"><span>Delete</span></BaseButton>
</template>
