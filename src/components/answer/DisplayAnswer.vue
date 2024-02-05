<script setup lang="ts">
  import { Answer } from '../../stores/retrospectiveStore';

  const { answer } = defineProps<{
    answer: Answer;
  }>();
</script>
<template>
  <div>{{ answer.text }}</div>
</template>
