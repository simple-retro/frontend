<script setup lang="ts">
  import { ref } from 'vue';
  import { Retrospective } from '../../stores/retrospectiveStore';
  import BaseButton from '../core/BaseButton.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import QuestionLayout from '../question/QuestionLayout.vue';
  import CreateQuestion from '../question/CreateQuestion.vue';
  import AnswerLayout from '../answer/AnswerLayout.vue';
  import PageDivider from '../core/PageDivider.vue';

  const { retrospective } = defineProps<{
    retrospective: Retrospective;
  }>();

  const isOpen = ref(false);

  const toggleQuestionModal = () => {
    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
      {{ retrospective.name }}
    </h1>
    <p v-if="retrospective.description" class="text-gray-500">
      {{ retrospective.description }}
    </p>
  </div>

  <BaseButton
    :style="'WHITE'"
    class="w-full transition-transform transform-gpu hover:scale-105 mb-10"
    @click="toggleQuestionModal"
  >
    Create question
  </BaseButton>

  <ModalifyComponent v-if="isOpen" @close="toggleQuestionModal">
    <CreateQuestion @fetched="$event.success && toggleQuestionModal()" />
  </ModalifyComponent>

  <div class="grid gap-4">
    <QuestionLayout
      v-for="(question, questionIndex) in retrospective.questions"
      :key="question.id"
      :question-index="questionIndex + 1"
      :question="question"
    />
  </div>

  <PageDivider v-if="retrospective.questions.length > 0" />

  <AnswerLayout :questions="retrospective.questions" />
</template>
