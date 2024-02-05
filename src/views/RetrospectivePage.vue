<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRetrospectiveStore } from '../stores/retrospectiveStore';
  import { useWebsocketStore } from '../stores/websocketStore';
  import DisplayQuestion from '../components/question/DisplayQuestion.vue';
  import BaseButton from '../components/BaseButton.vue';
  import CreateQuestion from '../components/question/CreateQuestion.vue';
  import ModalifyComponent from '../components/ModalifyComponent.vue';

  const retroStore = useRetrospectiveStore();

  const websocket = useWebsocketStore();
  websocket.connect(retroStore.currentRetro!.id);

  const { currentRetro } = storeToRefs(retroStore);
  const modalToShow = ref('none');

  const toggleQuestionModal = () => {
    if (!['none', 'question'].includes(modalToShow.value)) return;

    modalToShow.value = modalToShow.value === 'none' ? 'question' : 'none';
  };
</script>

<template>
  <h1 class="text-4xl font-bold text-center mb-10">Retro {{ currentRetro?.name }}</h1>
  <BaseButton
    data-modal-target="default-modal"
    data-modal-toggle="default-modal"
    @click="toggleQuestionModal"
    >Create question</BaseButton
  >

  <ModalifyComponent v-if="modalToShow === 'question'" @close="toggleQuestionModal">
    <CreateQuestion @fetched="$event.success && toggleQuestionModal()" />
  </ModalifyComponent>

  <div class="grid grid-cols-3 gap-10">
    <DisplayQuestion
      v-for="question in currentRetro!.questions"
      :key="question.id"
      :question="question"
      class="bg-red-600"
    />
  </div>
</template>
