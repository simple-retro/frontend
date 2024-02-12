<script setup lang="ts">
  import { computed } from 'vue';

  const { style } = withDefaults(
    defineProps<{
      style?: 'WHITE' | 'BLACK' | 'RED';
    }>(),
    {
      style: 'BLACK',
    },
  );

  const colors = computed(() => ({
    'border-gray-400': style === 'WHITE',
    'bg-white': style === 'WHITE',
    'hover:border-gray-500': style === 'WHITE',
    'disabled:hover:border-gray-200': style === 'WHITE',
    'disabled:text-gray-600': style === 'WHITE',

    'text-white': ['BLACK', 'RED'].includes(style),
    'bg-[#181818]': style === 'BLACK',
    'disabled:text-gray-300': ['BLACK', 'RED'].includes(style),
    'disabled:bg-gray-900': style === 'BLACK',

    'bg-red-600': style === 'RED',
    'disabled:bg-red-700': style === 'RED',
  }));
</script>

<template>
  <button
    :class="colors"
    class="inline-flex h-10 items-center justify-center rounded-md border text-sm shadow-sm px-8 hover:shadow-md hover:opacity-95 transition-opacity disabled:hover:opacity-100 disabled:hover:shadow-s disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>
