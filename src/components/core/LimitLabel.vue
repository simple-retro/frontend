<script setup lang="ts">
  defineProps<{ charactersLeft: number; labelFor: string; label: string }>();
</script>

<template>
  <div class="flex justify-between">
    <label :for="labelFor" class="text-md font-bold text-gray-900">{{ label }}</label>
    <Transition name="fade">
      <span
        v-if="charactersLeft <= 30"
        :id="`left-${labelFor}`"
        class="text-red-600 font-semibold"
        aria-live="polite"
        aria-atomic="true"
      >
        {{ charactersLeft }}
      </span>
    </Transition>
  </div>
</template>
