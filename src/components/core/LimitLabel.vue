<script setup lang="ts">
  import { ref, watch } from 'vue';

  const shouldBounce = ref(false);
  let clearBounceTimeout: number;

  const props = defineProps<{ charactersLeft: number; labelFor: string; label: string }>();

  watch(props, () => {
    if (props.charactersLeft > 10) return;
    clearTimeout(clearBounceTimeout);
    shouldBounce.value = true;

    clearBounceTimeout = setTimeout(() => {
      shouldBounce.value = false;
    }, 190);
  });
</script>

<template>
  <div class="flex justify-between">
    <label :for="labelFor" class="text-md font-bold text-gray-900">{{ label }}</label>
    <Transition name="fade">
      <span
        v-if="charactersLeft <= 30"
        :id="`left-${labelFor}`"
        :class="{
          'font-semibold': true,
          bounce: shouldBounce,
          'text-red-500': charactersLeft <= 10,
          'text-gray-400': charactersLeft > 10,
        }"
        aria-live="polite"
        aria-atomic="true"
      >
        {{ charactersLeft }}
      </span>
    </Transition>
  </div>
</template>

<style scoped>
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  .bounce {
    animation: bounce 0.2s infinite;
  }
</style>
