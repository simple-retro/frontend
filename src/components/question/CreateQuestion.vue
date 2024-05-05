<script setup lang="ts">
  import { ref } from 'vue';
  import questionApi from '../../services/questionApi';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import QuestionInputs from './QuestionInputs.vue';

  const notifyStore = useNotifyStore();
  const retroStore = useRetrospectiveStore();

  const question = ref('');
  const disableInteraction = ref(false);

  const emits = defineEmits<{ fetched: [{ success: boolean }] }>();

  const createQuestion = async () => {
    if (question.value.length < 5) return;

    disableInteraction.value = true;
    const res = await questionApi.createQuestion(question.value);
    disableInteraction.value = false;

    emits('fetched', { success: res.error === undefined });

    if (res.error)
      return notifyStore.notify('An error occured to create the question', NotificationType.Error);

    retroStore.question.createQuestion(res);
  };
</script>

<template>
  <QuestionInputs
    button-label="Create question"
    label="Create a question"
    :disabled="disableInteraction"
    :question="question"
    @update:question="($event) => (question = $event)"
    @clicked="createQuestion"
  />
</template>
