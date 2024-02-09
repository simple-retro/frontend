<script setup lang="ts">
  import { ref } from 'vue';
  import { Question } from '../../stores/retrospectiveStore';
  import AnswerLayout from '../answer/AnswerLayout.vue';
  import BaseButton from '../BaseButton.vue';
  import CreateAnswer from '../answer/CreateAnswer.vue';
  import ModalifyComponent from '../ModalifyComponent.vue';
  import DeleteQuestion from './DeleteQuestion.vue';
  import UpdateQuestion from './UpdateQuestion.vue';

  const { question } = defineProps<{
    question: Question;
  }>();

  const isOpen = ref(false);

  const toggleAnswerModal = () => {
    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <div>
    <ModalifyComponent v-if="isOpen" @close="toggleAnswerModal">
      <CreateAnswer :question-id="question.id" @fetched="$event.success && toggleAnswerModal()" />
    </ModalifyComponent>

    <div class="flex gap-10">
      <div>{{ question.text }}</div>
      <BaseButton @click="toggleAnswerModal">Answer</BaseButton>
      <DeleteQuestion :question="question" />
      <UpdateQuestion :question="question" />
    </div>

    <AnswerLayout v-for="answer in question.answers" :key="answer.id" :answer="answer" />
  </div>
</template>
