<script setup lang="ts">
  import { ref } from 'vue';
  import { Question } from '../../stores/retrospectiveStore';
  import CreateAnswer from '../answer/CreateAnswer.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import DeleteQuestion from './DeleteQuestion.vue';
  import UpdateQuestion from './UpdateQuestion.vue';
  import BaseButton from '../core/BaseButton.vue';
  import AnswerLayout from '../answer/AnswerLayout.vue';

  const { question, questionIndex, editable } = defineProps<{
    question: Question;
    questionIndex: number;
    editable: boolean;
  }>();

  const isCreateModalOpen = ref(false);
  const answersAreShown = ref(false);

  const toggleCreateAnswerModal = () => {
    isCreateModalOpen.value = !isCreateModalOpen.value;
  };

  const toggleDisplayAnswers = () => {
    answersAreShown.value = !answersAreShown.value;
  };
</script>

<template>
  <div>
    <ModalifyComponent v-if="isCreateModalOpen" @close="toggleCreateAnswerModal">
      <CreateAnswer
        :question="question"
        :question-index="questionIndex"
        @fetched="$event.success && toggleCreateAnswerModal()"
      />
    </ModalifyComponent>

    <div class="flex justify-between items-center">
      <p class="text-xl max-w-3xl font-bold break-word">
        {{ `Q${questionIndex}. ${question.text}` }}
        <BaseButton class="w-44" @click="toggleDisplayAnswers">{{
          answersAreShown ? 'Hide answers' : 'Show answers'
        }}</BaseButton>
      </p>

      <div class="flex gap-6 flex-shrink-0">
        <template v-if="editable">
          <UpdateQuestion :question-index="questionIndex" :question="question" />
          <DeleteQuestion :question-index="questionIndex" :question="question" />
        </template>
        <BaseButton v-else @click="toggleCreateAnswerModal">Answer</BaseButton>
      </div>
    </div>

    <div v-if="answersAreShown" class="overflow-hidden transition-max-height ease-out duration-300">
      <template v-if="question.answers.length > 0">
        <AnswerLayout v-for="answer in question.answers" :key="answer.id" :answer="answer" />
      </template>
      <span v-else>There are no answers yet...</span>
    </div>
  </div>
</template>
