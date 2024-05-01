<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../core/BaseButton.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import questionApi from '../../services/questionApi';
  import { Question, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import QuestionInputs from './QuestionInputs.vue';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const isOpen = ref(false);
  const disableInteraction = ref(false);

  const props = defineProps<{
    question: Question;
    questionIndex: number;
  }>();

  const updatedText = ref(props.question.text);

  const updateQuestion = async () => {
    if (updatedText.value === props.question.text) {
      isOpen.value = false;
      return;
    }

    disableInteraction.value = true;
    const res = await questionApi.editQuestion({ ...props.question, text: updatedText.value });
    disableInteraction.value = false;

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
    <QuestionInputs
      button-label="Update question"
      :label="`Q${questionIndex}. Update question`"
      :disabled="disableInteraction"
      :question="updatedText"
      @update:question="($event) => (updatedText = $event)"
      @clicked="updateQuestion"
    />
  </ModalifyComponent>

  <BaseButton @click="openModal"><span>Update question</span></BaseButton>
</template>
