<script setup lang="ts">
  import { ref } from 'vue';
  import { Answer, VoteAction } from '../../stores/retrospectiveStore';
  import UpdateAnswer from './UpdateAnswer.vue';
  import ModalifyComponent from '../core/ModalifyComponent.vue';
  import PageDivider from '../core/PageDivider.vue';
  import DeleteAnswer from './DeleteAnswer.vue';
  import VoteAnswer from './VoteAnswer.vue';
  import answerApi from '../../services/answerApi';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';

  const props = defineProps<{
    answer: Answer;
  }>();

  const notifyStore = useNotifyStore();

  const isControlModalOpen = ref(false);
  const selectedAnswer = ref<Answer | undefined>(undefined);
  const isVoted = ref(false);
  const disableInteraction = ref(false);

  const controlAnswerModal = () => {
    selectedAnswer.value = props.answer;
    isControlModalOpen.value = true;
  };

  const handleVote = async () => {
    if (disableInteraction.value) return;

    const action = isVoted.value ? VoteAction.REMOVE_VOTE : VoteAction.ADD_VOTE;

    disableInteraction.value = true;
    const res = await answerApi.voteInAnswer(props.answer.id, action);

    setTimeout(() => {
      disableInteraction.value = false;
    }, 300);

    if (res?.error)
      return notifyStore.notify('An error occured when voting the answer', NotificationType.Error);

    isVoted.value = !isVoted.value;

    if (res.conflict)
      notifyStore.notify('You had already voted on this answer', NotificationType.Warning);
  };
</script>

<template>
  <div>
    <div class="rounded-xl border bg-white text-slate-950 shadow-sm p-4">
      <div class="flex items-center gap-4">
        <VoteAnswer :voted="isVoted" :votes="answer.votes" @vote-change="handleVote" />

        <div title="Edit answer" class="flex-1 cursor-pointer" @click="controlAnswerModal">
          <p class="text-base text-slate-800">{{ answer.text }}</p>
        </div>
      </div>
    </div>

    <ModalifyComponent v-if="isControlModalOpen" @close="isControlModalOpen = false">
      <UpdateAnswer :answer="selectedAnswer!" @close="isControlModalOpen = false" />
      <PageDivider class="mt-3" />
      <DeleteAnswer class="mt-3" :answer="selectedAnswer!" @close="isControlModalOpen = false" />
    </ModalifyComponent>
  </div>
</template>
