<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../BaseButton.vue';
  import ModalifyComponent from '../ModalifyComponent.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import questionApi from '../../services/questionApi';
  import { Question, useRetrospectiveStore } from '../../stores/retrospectiveStore';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const isOpen = ref(false);

  const { question } = defineProps<{
    question: Question;
  }>();

  const updatedText = ref(question.text);

  const updateQuestion = async () => {
    const res = await questionApi.editQuestion({ ...question, text: updatedText.value });

    if (res?.error)
      return notifyStore.notify(
        'An error occured when updating the question',
        NotificationType.Error,
      );

    retroStore.question.updateQuestion(res);

    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <ModalifyComponent v-if="isOpen" @close="isOpen = !isOpen">
    <div class="flex flex-col gap-6">
      <h3>Update the question</h3>
      <textarea v-model="updatedText" cols="30" rows="10" />
      <div class="flex flex-row gap-4">
        <BaseButton @click="updateQuestion">Update</BaseButton>
        <BaseButton @click="isOpen = !isOpen">Cancel</BaseButton>
      </div>
    </div>
  </ModalifyComponent>

  <BaseButton @click="isOpen = !isOpen"><span>Update</span></BaseButton>
</template>
