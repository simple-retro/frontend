<script setup lang="ts">
  import { ref } from 'vue';
  import { Question } from '../../stores/retrospectiveStore';
  import DisplayAnswer from '../answer/DisplayAnswer.vue';
  import BaseButton from '../BaseButton.vue';
  import CreateAnswer from '../answer/CreateAnswer.vue';
  import ModalifyComponent from '../ModalifyComponent.vue';

  const { question } = defineProps<{
    question: Question;
  }>();

  const modalToShow = ref('none');

  const toggleAnswerModal = () => {
    if (!['none', 'answer'].includes(modalToShow.value)) return;

    modalToShow.value = modalToShow.value === 'none' ? 'answer' : 'none';
  };
</script>

<template>
  <div>
    <ModalifyComponent v-if="modalToShow === 'answer'" @close="toggleAnswerModal">
      <CreateAnswer :question-id="question.id" @fetched="$event.success && toggleAnswerModal()" />
    </ModalifyComponent>

    <div class="flex gap-10">
      <div>{{ question.text }}</div>
      <BaseButton @click="toggleAnswerModal">Answer</BaseButton>
    </div>

    <DisplayAnswer v-for="answer in question.answers" :key="answer.id" :answer="answer" />
  </div>
</template>
