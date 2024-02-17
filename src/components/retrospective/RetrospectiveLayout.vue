<script setup lang="ts">
  import { ref } from 'vue';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import QuestionLayout from '../question/QuestionLayout.vue';
  import ShareRetro from '../core/ShareRetroButton.vue';
  import CreateQuestion from '../question/CreateQuestion.vue';
  import { storeToRefs } from 'pinia';
  import { RouterLink } from 'vue-router';
  import BaseButton from '../core/BaseButton.vue';

  const retroStore = useRetrospectiveStore();

  const { currentRetro: retrospective } = storeToRefs(retroStore);
  const isOpen = ref(false);

  const toggleQuestionModal = () => {
    isOpen.value = !isOpen.value;
  };
</script>

<template>
  <template v-if="retrospective">
    <div class="flex flex-col">
      <h1
        class="text-3xl font-bold tracking-tighter flex justify-between items-center sm:text-4xl md:text-5xl"
      >
        {{ retrospective.name }}
        <div class="flex gap-2">
          <ShareRetro />
          <RouterLink
            class="flex self-center flex-shrink-0"
            :to="{ name: 'retrospective.edit', params: { id: retrospective.id } }"
          >
            <BaseButton :style="'WHITE'">Edit</BaseButton>
          </RouterLink>
        </div>
      </h1>
      <p v-if="retrospective.description" class="text-gray-500">
        {{ retrospective.description }}
      </p>
    </div>

    <ModalifyComponent v-if="isOpen" @close="toggleQuestionModal">
      <CreateQuestion @fetched="$event.success && toggleQuestionModal()" />
    </ModalifyComponent>

    <div class="grid gap-4">
      <TransitionGroup name="fade">
        <QuestionLayout
          v-for="(question, questionIndex) in retrospective.questions"
          :key="question.id"
          :question-index="questionIndex + 1"
          :question="question"
          :editable="false"
        />
      </TransitionGroup>
    </div>
  </template>
</template>
