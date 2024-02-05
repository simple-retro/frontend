<script setup lang="ts">
  import { ref } from 'vue';
  import answerApi from '../../services/answerApi';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';

  const notifyStore = useNotifyStore();
  const answer = ref('');
  const disableIntearction = ref(false);

  const createAnswer = async () => {
    if (answer.value.length < 1) return;

    disableIntearction.value = true;

    const res = await answerApi.createAnswer(answer.value);

    disableIntearction.value = false;

    if (res.error)
      return notifyStore.notify('An error occured to create the question', NotificationType.Error);

    notifyStore.notify('Coisa criada!', NotificationType.Success);
  };
</script>

<template>
  <div class="max-w-xl relative">
    <label for="answer" class="block mb-2 text-sm text-gray-900">Your answer</label>
    <textarea
      id="answer"
      v-model="answer"
      :disabled="disableIntearction"
      rows="4"
      class="block mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
      placeholder="Eat potato..."
    />

    <button
      type="button"
      :disabled="disableIntearction || answer.length < 1"
      class="right-0 absolute text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:hover:bg-gradient-to-r disabled:opacity-75 rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      @click="createAnswer"
    >
      Send answer
    </button>
  </div>
</template>
