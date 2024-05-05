<script setup lang="ts">
  import { computed } from 'vue';
  import { useLimistStore } from '../../stores/limitsStore';
  import BaseButton from '../core/BaseButton.vue';
  import LimitLabel from '../core/LimitLabel.vue';

  const limitsStore = useLimistStore();

  const props = defineProps<{
    answer: string;
    label: string;
    placeholder: string;
    buttonLabel: string;
    disabled: boolean;
  }>();

  const charactersLeft = computed(() => {
    const limit = limitsStore.limits?.answer.text ?? 0;

    return limit - props.answer.length;
  });

  const emit = defineEmits<{
    'update:answer': [string];
    clicked: [];
  }>();
</script>

<template>
  <LimitLabel :characters-left="charactersLeft" :label="label" label-for="answer" />

  <textarea
    id="answer"
    aria-describedby="left-question"
    :value="answer"
    :disabled="disabled || !limitsStore.limits"
    :maxlength="limitsStore.limits?.answer.text"
    rows="4"
    class="block mb-5 p-2.5 resize-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
    :placeholder="placeholder"
    @input="emit('update:answer', ($event.target as HTMLInputElement).value)"
  />

  <BaseButton
    :disabled="
      disabled ||
      answer.length < 1 ||
      !limitsStore.limits ||
      answer.length > limitsStore.limits.answer.text
    "
    class="w-full"
    @click="emit('clicked')"
  >
    {{ buttonLabel }}
  </BaseButton>
</template>
