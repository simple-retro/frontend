<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../core/BaseButton.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import questionApi from '../../services/questionApi';
  import { Question, useRetrospectiveStore } from '../../stores/retrospectiveStore';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const isOpen = ref(false);

  const { question, questionIndex } = defineProps<{
    question: Question;
    questionIndex: number;
  }>();

  const updatedText = ref(question.text);

  const updateQuestion = async () => {
    if (updatedText.value === question.text) {
      isOpen.value = false;
      return;
    }

    const res = await questionApi.editQuestion({ ...question, text: updatedText.value });

    if (res?.error)
      return notifyStore.notify(
        'An error occured when updating the question',
        NotificationType.Error,
      );

    retroStore.question.updateQuestion(res);

    isOpen.value = false;
  };

  const openModal = () => {
    isOpen.value = true;
  };

  defineExpose({ openModal });
</script>

<template>
  <ModalifyComponent v-if="isOpen" @close="isOpen = false">
    <label for="question" class="block mb-2 text-md font-bold text-gray-900">
      {{ `Q${questionIndex}. Update question` }}
    </label>
    <textarea
      id="question"
      v-model="updatedText"
      rows="4"
      class="flex mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 disabled:opacity-75"
      placeholder="When you were a child..."
    />

    <BaseButton class="w-full" @click="updateQuestion">Update question</BaseButton>
  </ModalifyComponent>

  <BaseButton @click="openModal"><span>Update question</span></BaseButton>
</template>
