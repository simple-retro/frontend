<script setup lang="ts">
  import { ref } from 'vue';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import BaseButton from '../core/BaseButton.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import QuestionLayout from '../question/QuestionLayout.vue';
  import CreateQuestion from '../question/CreateQuestion.vue';
  import AnswerLayout from '../answer/AnswerLayout.vue';
  import PageDivider from '../core/PageDivider.vue';
  import EditIcon from '../icons/EditIcon.vue';
  import UpdateRetrospective from './UpdateRetrospective.vue';
  import { storeToRefs } from 'pinia';

  const retroStore = useRetrospectiveStore();

  const { currentRetro: retrospective } = storeToRefs(retroStore);
  const isOpen = ref(false);
  const updateRetro = ref();

  const toggleQuestionModal = () => {
    isOpen.value = !isOpen.value;
  };

  const toogleEditRetroModal = () => {
    updateRetro.value.toggleModal();
  };
</script>

<template>
  <template v-if="retrospective">
    <UpdateRetrospective ref="updateRetro" :retrospective="retrospective" />

    <div class="space-y-2">
      <h1
        class="text-3xl font-bold tracking-tighter flex justify-between items-center sm:text-4xl md:text-5xl"
      >
        <div class="flex cursor-pointer" @click="toogleEditRetroModal">
          {{ retrospective.name }}
          <EditIcon class="ml-4" :size="42" />
        </div>
        <RouterLink
          class="flex self-center"
          :to="{ name: 'retrospective.view', params: { id: retrospective.id } }"
        >
          <BaseButton :style="'WHITE'">Back to Retro</BaseButton>
        </RouterLink>
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
</template>
