<script setup lang="ts">
  import { computed } from 'vue';
  import { useLimistStore } from '../../stores/limitsStore';
  import BaseButton from '../core/BaseButton.vue';
  import LimitLabel from '../core/LimitLabel.vue';

  const limitsStore = useLimistStore();

  const props = defineProps<{
    retroName: string;
    retroDescription: string | undefined;
    buttonLabel: string;
    disabled: boolean;
  }>();

  const charactersLeftForName = computed(() => {
    const limit = limitsStore.limits?.retrospective.name ?? 0;

    return limit - props.retroName.length;
  });

  const charactersLeftForDescription = computed(() => {
    const limit = limitsStore.limits?.retrospective.description ?? 0;

    return limit - (props.retroDescription?.length ?? 0);
  });

  const emit = defineEmits<{
    'update:retroName': [string];
    'update:retroDescription': [string];
    clicked: [];
  }>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <LimitLabel :characters-left="charactersLeftForName" label="Name" label-for="name" />
    <input
      id="name"
      aria-describedby="left-name"
      :value="retroName"
      :disabled="disabled || !limitsStore.limits"
      :maxlength="limitsStore.limits?.retrospective.name"
      rows="4"
      class="flex p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
      placeholder="When you were a child..."
      @input="emit('update:retroName', ($event.target as HTMLInputElement).value)"
    />

    <LimitLabel
      :characters-left="charactersLeftForDescription"
      label="Description"
      label-for="description"
    />
    <textarea
      id="description"
      aria-describedby="left-description"
      :value="retroDescription"
      :disabled="disabled || !limitsStore.limits"
      :maxlength="limitsStore.limits?.retrospective.description"
      rows="4"
      class="flex mb-5 p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
      placeholder="Retrospective to talk about sprint 123, gather some feedback and be better!"
      @input="emit('update:retroDescription', ($event.target as HTMLInputElement).value)"
    />

    <BaseButton
      :disabled="
        disabled ||
        retroName.length < 5 ||
        !limitsStore.limits ||
        retroName.length > limitsStore.limits.retrospective.name ||
        (retroDescription?.length ?? 0) > limitsStore.limits.retrospective.description
      "
      class="w-full"
      @click="emit('clicked')"
    >
      {{ buttonLabel }}
    </BaseButton>
  </div>
</template>
