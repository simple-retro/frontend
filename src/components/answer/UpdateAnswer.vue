<script setup lang="ts">
  import { ref } from 'vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { Answer, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import answerApi from '../../services/answerApi';
  import AnswerInputs from './AnswerInputs.vue';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const emits = defineEmits<{
    close: [];
  }>();

  const props = defineProps<{
    answer: Answer;
  }>();

  const updatedText = ref(props.answer.text);
  const disableInteraction = ref(false);

  const updateAnswer = async () => {
    if (updatedText.value === props.answer.text) {
      emits('close');
      return;
    }

    disableInteraction.value = true;
    const res = await answerApi.editAnswer({ ...props.answer, text: updatedText.value });
    disableInteraction.value = false;

    if (res.error)
      return notifyStore.notify(
        'An error occured when updating the answer',
        NotificationType.Error,
      );

    retroStore.answer.updateAnswer(res);

    emits('close');
  };
</script>

<template>
  <AnswerInputs
    label="Update answer"
    :answer="updatedText"
    placeholder="Eat potato..."
    button-label="Update answer"
    :disabled="disableInteraction"
    @clicked="updateAnswer"
    @update:answer="($event) => (updatedText = $event)"
  />
</template>
