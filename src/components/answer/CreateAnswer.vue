<script setup lang="ts">
  import { ref } from 'vue';
  import answerApi from '../../services/answerApi';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { Question, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import AnswerInputs from './AnswerInputs.vue';

  const notifyStore = useNotifyStore();
  const retroStore = useRetrospectiveStore();

  const answer = ref('');
  const disableInteraction = ref(false);

  const { question, questionIndex } = defineProps<{
    question: Question;
    questionIndex: number;
  }>();

  const emits = defineEmits<{ fetched: [{ success: boolean }] }>();

  const createAnswer = async () => {
    if (answer.value.length < 1) return;

    disableInteraction.value = true;

    const res = await answerApi.createAnswer(answer.value, question.id);

    emits('fetched', { success: res.error === undefined });

    disableInteraction.value = false;

    if (res.error)
      return notifyStore.notify('An error occured to create the question', NotificationType.Error);

    retroStore.answer.createAnswer({ ...res, question_id: question.id });
  };
</script>

<template>
  <AnswerInputs
    :label="`Q${questionIndex}. Your answer`"
    :answer="answer"
    :placeholder="question.text"
    button-label="Send answer"
    :disabled="disableInteraction"
    @clicked="createAnswer"
    @update:answer="($event) => (answer = $event)"
  />
</template>
