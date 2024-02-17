<script setup lang="ts">
  import { ref } from 'vue';
  import { Answer } from '../../stores/retrospectiveStore';
  import UpdateAnswer from './UpdateAnswer.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import PageDivider from '../core/PageDivider.vue';
  import DeleteAnswer from './DeleteAnswer.vue';

  const { answer } = defineProps<{
    answer: Answer;
  }>();

  const isControlModalOpen = ref(false);
  const selectedAnswer = ref<Answer | undefined>(undefined);

  const controlAnswerModal = (answer: Answer) => {
    selectedAnswer.value = answer;

    isControlModalOpen.value = true;
  };
</script>

<template>
  <div>
    <div class="flex flex-col cursor-pointer" @click="controlAnswerModal(answer)">
      <i class="absolute">•</i>
      <div class="text-black ml-5">{{ answer.text }}</div>
    </div>

    <ModalifyComponent v-if="isControlModalOpen" @close="isControlModalOpen = false">
      <UpdateAnswer :answer="selectedAnswer!" @close="isControlModalOpen = false" />
      <PageDivider class="mt-3" />
      <DeleteAnswer class="mt-3" :answer="selectedAnswer!" @close="isControlModalOpen = false" />
    </ModalifyComponent>
  </div>
</template>
