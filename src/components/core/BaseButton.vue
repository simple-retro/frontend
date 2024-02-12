<script setup lang="ts">
  const { style } = withDefaults(
    defineProps<{
      style?: 'WHITE' | 'DARK';
    }>(),
    {
      style: 'DARK',
    },
  );
</script>

<template>
  <button
    :class="
      style === 'WHITE'
        ? 'inline-flex h-10 items-center justify-center rounded-md border border-gray-400 bg-white text-sm shadow-sm px-8 hover:shadow-md hover:border-gray-500 hover:opacity-95 transition-opacity disabled:hover:opacity-100 disabled:hover:shadow-sm disabled:hover:border-gray-200 disabled:text-gray-600  disabled:cursor-not-allowed'
        : 'inline-flex h-10 items-center justify-center rounded-md border text-white text-sm shadow-sm px-8 bg-[#181818] hover:opacity-95 transition-opacity disabled:hover:opacity-100 disabled:text-gray-300 disabled:bg-gray-900 disabled:cursor-not-allowed'
    "
  >
    <slot />
  </button>
</template>
