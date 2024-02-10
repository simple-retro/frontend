<script setup lang="ts">
  import { ref } from 'vue';
  import BaseButton from '../BaseButton.vue';
  import ModalifyComponent from '../ModalifyComponent.vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { Answer, useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import answerApi from '../../services/answerApi';

  const retroStore = useRetrospectiveStore();
  const notifyStore = useNotifyStore();

  const isOpen = ref(false);

  const { answer } = defineProps<{
    answer: Answer;
  }>();

  const updatedText = ref(answer.text);

  const updateAnswer = async () => {
    const res = await answerApi.editAnswer({ ...answer, text: updatedText.value });

    if (res.error)
      return notifyStore.notify(
        'An error occured when updating the answer',
        NotificationType.Error,
      );

    retroStore.answer.updateAnswer(res);

    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <ModalifyComponent v-if="isOpen" @close="isOpen = !isOpen">
    <div class="flex flex-col gap-6">
      <h3>Update the answer</h3>
      <textarea v-model="updatedText" cols="30" rows="10" />
      <div class="flex flex-row gap-4">
        <BaseButton @click="updateAnswer">Update</BaseButton>
        <BaseButton @click="isOpen = !isOpen">Cancel</BaseButton>
      </div>
    </div>
  </ModalifyComponent>

  <BaseButton @click="isOpen = !isOpen"><span>Update</span></BaseButton>
</template>
