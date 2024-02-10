<script setup lang="ts">
  import { ref } from 'vue';
  import { Retrospective } from '../../stores/retrospectiveStore';
  import BaseButton from '../BaseButton.vue';
  import ModalifyComponent from '../ModalifyComponent.vue';
  import UpdateRetrospective from './UpdateRetrospective.vue';
  import DeleteRetrospective from './DeleteRetrospective.vue';
  import QuestionLayout from '../question/QuestionLayout.vue';
  import CreateQuestion from '../question/CreateQuestion.vue';

  const { retrospective } = defineProps<{
    retrospective: Retrospective;
  }>();

  const isOpen = ref(false);

  const toggleQuestionModal = () => {
    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <h1 class="text-4xl font-bold text-center mb-2">Retro {{ retrospective.name }}</h1>
  <h3 v-if="retrospective.description" class="text-center mb-10">
    {{ retrospective.description }}
  </h3>

  <div class="flex flex-col">
    <div class="flex gap-10 justify-center">
      <UpdateRetrospective :retrospective="retrospective" />
      <DeleteRetrospective :retrospective="retrospective" />
    </div>
    <BaseButton
      class="mx-auto w-80"
      data-modal-target="default-modal"
      data-modal-toggle="default-modal"
      @click="toggleQuestionModal"
    >
      Create question
    </BaseButton>
  </div>

  <ModalifyComponent v-if="isOpen" @close="toggleQuestionModal">
    <CreateQuestion @fetched="$event.success && toggleQuestionModal()" />
  </ModalifyComponent>

  <div class="grid grid-cols-3 gap-10">
    <QuestionLayout
      v-for="question in retrospective.questions"
      :key="question.id"
      :question="question"
      class="bg-red-600"
    />
  </div>
</template>
