<script setup lang="ts">
  import { ref } from 'vue';
  import questionApi from '../../services/questionApi';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import BaseButton from '../BaseButton.vue';

  const notifyStore = useNotifyStore();
  const retroStore = useRetrospectiveStore();
  const question = ref('');
  const disableIntearction = ref(false);

  const emits = defineEmits<{ fetched: [{ success: boolean }] }>();

  const createQuestion = async () => {
    if (question.value.length < 5) return;

    disableIntearction.value = true;

    const res = await questionApi.createQuestion(question.value);

    disableIntearction.value = false;

    emits('fetched', { success: res.error === undefined });

    if (res.error)
      return notifyStore.notify('An error occured to create the question', NotificationType.Error);

    retroStore.question.createQuestion(res);
  };
</script>

<template>
  <label for="question" class="block mb-2 text-md font-bold text-gray-900">Make a question</label>
  <textarea
    id="question"
    v-model="question"
    :disabled="disableIntearction"
    rows="4"
    class="flex mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
    placeholder="When you were a child..."
  />

  <BaseButton
    :disabled="disableIntearction || question.length < 5"
    class="w-full"
    @click="createQuestion"
  >
    Create question
  </BaseButton>
</template>
