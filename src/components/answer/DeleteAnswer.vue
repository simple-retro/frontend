<script setup lang="ts">
  import BaseButton from '../core/BaseButton.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { Answer, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import answerApi from '../../services/answerApi';
  import { ref } from 'vue';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const emits = defineEmits<{
    close: [];
  }>();

  const props = defineProps<{
    answer: Answer;
  }>();

  const confirmedId = ref('');

  const deleteAnswer = async () => {
    if (confirmedId.value !== props.answer.id) {
      confirmedId.value = props.answer.id;
      return;
    }

    const res = await answerApi.deleteAnswer(props.answer.id);

    if (res?.error)
      return notifyStore.notify('An error occured to delete the answer', NotificationType.Error);

    retroStore.answer.deleteAnswer(props.answer);

    emits('close');
  };
</script>

<template>
  <div class="flex flex-col gap-1 cursor-default">
    <p class="block text-md font-bold text-gray-900">Delete answer</p>
    <span>Do you want to delete this answer?</span>
    <span v-if="confirmedId === answer.id">Press again to confirm.</span>

    <BaseButton :style="'RED'" class="mt-2" @click="deleteAnswer">Delete answer</BaseButton>
  </div>
</template>
