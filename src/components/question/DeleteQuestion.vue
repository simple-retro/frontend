<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../BaseButton.vue';
  import ModalifyComponent from '../ModalifyComponent.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import questionApi from '../../services/questionApi';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const isOpen = ref(false);

  const { questionId } = defineProps<{
    questionId: string;
  }>();

  const deleteQuestion = async () => {
    const res = await questionApi.deleteQuestion(questionId);

    if (res?.error)
      return notifyStore.notify('An error occured to delete the question', NotificationType.Error);

    retroStore.question.deleteQuestion({ id: questionId });

    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <ModalifyComponent v-if="isOpen" @close="isOpen = !isOpen">
    <div class="flex flex-col gap-6">
      <h3>Are you sure you want to delete this question?</h3>
      <div class="flex flex-row gap-4">
        <BaseButton @click="deleteQuestion">Delete</BaseButton>
        <BaseButton @click="isOpen = !isOpen">Cancel</BaseButton>
      </div>
    </div>
  </ModalifyComponent>

  <BaseButton @click="isOpen = !isOpen"><span>Delete</span></BaseButton>
</template>
