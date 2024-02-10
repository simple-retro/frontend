<script setup lang="ts">
  import { Answer } from '../../stores/retrospectiveStore';
  import DeleteAnswer from './DeleteAnswer.vue';
  import UpdateAnswer from './UpdateAnswer.vue';

  const { answer } = defineProps<{
    answer: Answer;
  }>();
</script>
<template>
  <div class="flex gap-10">
    <div>{{ answer.text }}</div>
    <DeleteAnswer :answer="answer" />
    <UpdateAnswer :answer="answer" />
  </div>
</template>
