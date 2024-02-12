<script setup lang="ts">
  import { ref } from 'vue';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import BaseButton from '../core/BaseButton.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import QuestionLayout from '../question/QuestionLayout.vue';
  import CreateQuestion from '../question/CreateQuestion.vue';
  import EditIcon from '../icons/EditIcon.vue';
  import UpdateRetrospective from './UpdateRetrospective.vue';
  import DeleteRetrospective from './DeleteRetrospective.vue';
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

    <div class="flex flex-col">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          <div class="flex cursor-pointer" @click="toogleEditRetroModal">
            {{ retrospective.name }}
            <EditIcon class="ml-4" :size="42" />
          </div>
        </h1>

        <div class="flex gap-2">
          <RouterLink
            class="flex self-center flex-shrink-0"
            :to="{ name: 'retrospective.view', params: { id: retrospective.id } }"
          >
            <BaseButton class="font-bold" :style="'WHITE'">Back to Retro</BaseButton>
          </RouterLink>
          <DeleteRetrospective :retrospective="retrospective" />
        </div>
      </div>
      <p v-if="retrospective.description" class="text-gray-500">
        {{ retrospective.description }}
      </p>
      <BaseButton
        class="w-full mt-10 transition-transform transform-gpu hover:scale-105 mb-10"
        @click="toggleQuestionModal"
      >
        Create question
      </BaseButton>
    </div>

    <ModalifyComponent v-if="isOpen" @close="toggleQuestionModal">
      <CreateQuestion @fetched="$event.success && toggleQuestionModal()" />
    </ModalifyComponent>

    <div class="grid gap-4">
      <QuestionLayout
        v-for="(question, questionIndex) in retrospective.questions"
        :key="question.id"
        :question-index="questionIndex + 1"
        :question="question"
        :editable="true"
      />
    </div>
  </template>
</template>
