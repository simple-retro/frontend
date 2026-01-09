<script setup lang="ts">
  import { ref } from 'vue';
  import { Question } from '../../stores/retrospectiveStore';
  import CreateAnswer from '../answer/CreateAnswer.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import DeleteQuestion from './DeleteQuestion.vue';
  import UpdateQuestion from './UpdateQuestion.vue';
  import BaseButton from '../core/BaseButton.vue';
  import AnswerLayout from '../answer/AnswerLayout.vue';
  import OpenEyeIcon from '../icons/OpenEyeIcon.vue';
  import ClosedEyeIcon from '../icons/ClosedEyeIcon.vue';

  defineProps<{
    question: Question;
    questionIndex: number;
    editable: boolean;
  }>();

  const isCreateModalOpen = ref(false);
  const answersAreShown = ref(true);

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
      <p
        class="text-xl font-bold break-all flex gap-2 cursor-pointer items-center"
        :class="{ 'max-w-3xl': editable, 'max-w-4xl': !editable }"
        @click="toggleDisplayAnswers"
      >
        {{ `Q${questionIndex}. ${question.text}` }}
        <OpenEyeIcon v-if="answersAreShown" class="flex flex-shrink-0" :size="24" />
        <ClosedEyeIcon v-else class="flex flex-shrink-0" :size="24" />
      </p>

      <div class="flex gap-2 flex-shrink-0">
        <template v-if="editable">
          <UpdateQuestion :question-index="questionIndex" :question="question" />
          <DeleteQuestion :question-index="questionIndex" :question="question" />
        </template>
        <BaseButton v-else @click="toggleCreateAnswerModal">Answer</BaseButton>
      </div>
    </div>

    <div
      v-if="answersAreShown"
      class="mx-auto space-y-4 p-6 overflow-hidden transition-max-height ease-out duration-300"
    >
      <template v-if="question.answers.length > 0">
        <TransitionGroup name="fade">
          <AnswerLayout v-for="answer in question.answers" :key="answer.id" :answer="answer" />
        </TransitionGroup>
      </template>
      <span v-else>There are no answers yet...</span>
    </div>
  </div>
</template>
