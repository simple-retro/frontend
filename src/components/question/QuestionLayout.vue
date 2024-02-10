<script setup lang="ts">
  import { ref } from 'vue';
  import { Question } from '../../stores/retrospectiveStore';
  import CreateAnswer from '../answer/CreateAnswer.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import DeleteQuestion from './DeleteQuestion.vue';
  import UpdateQuestion from './UpdateQuestion.vue';

  const { question, questionIndex } = defineProps<{
    question: Question;
    questionIndex: number;
  }>();

  const isOpen = ref(false);

  const toggleAnswerModal = () => {
    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <div>
    <ModalifyComponent v-if="isOpen" @close="toggleAnswerModal">
      <CreateAnswer
        :question="question"
        :question-index="questionIndex"
        @fetched="$event.success && toggleAnswerModal()"
      />
    </ModalifyComponent>

    <div class="flex justify-between">
      <div class="flex gap-10">
        <div class="cursor-pointer max-w-3xl" @click="toggleAnswerModal">
          <p class="text-xl font-bold underline break-word">
            {{ `Q${questionIndex}. ${question.text}` }}
          </p>
          <span class="text-sm">Click to answer</span>
        </div>
      </div>
      <div class="flex gap-6">
        <UpdateQuestion :question-index="questionIndex" :question="question" />
        <DeleteQuestion :question-index="questionIndex" :question="question" />
      </div>
    </div>
  </div>
</template>
