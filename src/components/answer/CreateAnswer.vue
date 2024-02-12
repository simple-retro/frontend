<script setup lang="ts">
  import { ref } from 'vue';
  import answerApi from '../../services/answerApi';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { Question, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import BaseButton from '../core/BaseButton.vue';

  const notifyStore = useNotifyStore();
  const retroStore = useRetrospectiveStore();
  const answer = ref('');
  const disableIntearction = ref(false);

  const { question, questionIndex } = defineProps<{
    question: Question;
    questionIndex: number;
  }>();

  const emits = defineEmits<{ fetched: [{ success: boolean }] }>();

  const createAnswer = async () => {
    if (answer.value.length < 1) return;

    disableIntearction.value = true;

    const res = await answerApi.createAnswer(answer.value, question.id);

    emits('fetched', { success: res.error === undefined });

    disableIntearction.value = false;

    if (res.error)
      return notifyStore.notify('An error occured to create the question', NotificationType.Error);

    retroStore.answer.createAnswer({ ...res, question_id: question.id });
  };
</script>

<template>
  <label for="answer" class="block mb-2 text-md font-bold text-gray-900">
    {{ `Q${questionIndex}. Your answer` }}
  </label>

  <textarea
    id="answer"
    v-model="answer"
    :disabled="disableIntearction"
    rows="4"
    class="block mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
    :placeholder="question.text"
  />

  <BaseButton
    :disabled="disableIntearction || answer.length < 1"
    class="w-full"
    @click="createAnswer"
  >
    Send answer
  </BaseButton>
</template>
