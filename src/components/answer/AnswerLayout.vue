<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { Answer, Question } from '../../stores/retrospectiveStore';
  import UpdateAnswer from './UpdateAnswer.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import PageDivider from '../core/PageDivider.vue';
  import DeleteAnswer from './DeleteAnswer.vue';

  const { questions } = defineProps<{
    questions: Question[];
  }>();

  const someHaveAnswers = computed(() => questions.some((q) => q.answers.length > 0));

  const isOpen = ref(false);
  const selectedAnswer = ref<Answer | undefined>(undefined);

  const openModal = (answer: Answer) => {
    selectedAnswer.value = answer;

    isOpen.value = true;
  };
</script>

<template>
  <ModalifyComponent v-if="isOpen" @close="isOpen = !isOpen">
    <UpdateAnswer :answer="selectedAnswer!" @close="isOpen = false" />

    <PageDivider class="mt-3" />
    <DeleteAnswer class="mt-3" :answer="selectedAnswer!" @close="isOpen = false" />
  </ModalifyComponent>

  <div v-for="(question, questionIndex) in questions" :key="`answer-${question.id}`">
    <template v-if="someHaveAnswers">
      <p
        class="text-xl font-bold"
        :class="{
          'text-neutral-500': question.answers.length === 0,
        }"
      >
        {{ `A${questionIndex + 1}. ${question.text}` }}
      </p>

      <template v-if="question.answers.length > 0">
        <div
          v-for="answer in question.answers"
          :key="answer.id"
          class="flex flex-col cursor-pointer"
          @click="openModal(answer)"
        >
          <i class="absolute">•</i>
          <div class="text-gray-500 ml-5">{{ answer.text }}</div>
        </div>
      </template>
      <span v-else class="text-gray-500">There is no answers yet...</span>
    </template>
  </div>
</template>
