<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../core/BaseButton.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { Answer, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import answerApi from '../../services/answerApi';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const emits = defineEmits<{
    close: [];
  }>();

  const { answer } = defineProps<{
    answer: Answer;
  }>();

  const updatedText = ref(answer.text);

  const updateAnswer = async () => {
    if (updatedText.value === answer.text) {
      emits('close');
      return;
    }

    const res = await answerApi.editAnswer({ ...answer, text: updatedText.value });

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
  <label for="answer" class="block mb-2 text-md font-bold text-gray-900">Update answer</label>
  <textarea
    id="answer"
    v-model="updatedText"
    rows="6"
    class="flex mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 disabled:opacity-75"
    placeholder="Eat potato..."
  />

  <BaseButton class="w-full" @click="updateAnswer">Update answer</BaseButton>
</template>
