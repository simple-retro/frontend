<script setup lang="ts">
  import { useLimistStore } from '../../stores/limitsStore';
  import BaseButton from '../core/BaseButton.vue';

  const limitsStore = useLimistStore();

  const { question } = defineProps<{
    question: string;
    label: string;
    buttonLabel: string;
    disabled: boolean;
  }>();

  const emit = defineEmits<{
    'update:question': [string];
    clicked: [];
  }>();
</script>

<template>
  <label for="question" class="block mb-2 text-md font-bold text-gray-900">{{ label }}</label>
  <textarea
    id="question"
    :value="question"
    :disabled="disabled || !limitsStore.limits"
    :maxlength="limitsStore.limits?.question.text"
    rows="4"
    class="flex mb-5 p-2.5 resize-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
    placeholder="When you were a child..."
    @input="emit('update:question', ($event.target as HTMLInputElement).value)"
  />

  <BaseButton
    :disabled="
      disabled ||
      question.length < 5 ||
      !limitsStore.limits ||
      question.length > limitsStore.limits.question.text
    "
    class="w-full"
    @click="emit('clicked')"
  >
    {{ buttonLabel }}
  </BaseButton>
</template>
