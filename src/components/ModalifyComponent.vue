<script setup lang="ts">
  const emit = defineEmits<{
    close: [];
  }>();

  const close = () => {
    emit('close');
  };
</script>

<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center"
    @click="close"
  ></div>
  <div class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
    <slot />
  </div>
</template>
