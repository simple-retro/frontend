<script setup lang="ts">
  const emit = defineEmits<{
    close: [];
  }>();

  const close = () => {
    emit('close');
  };

  const { extraClasses } = defineProps<{ extraClasses?: string }>();
</script>

<template>
  <div
    class="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70 cursor-pointer"
    @click="close"
  >
    <div class="bg-white px-8 rounded-md w-6/12" :class="extraClasses ?? 'pt-3 pb-8'" @click.stop>
      <slot />
    </div>
  </div>
</template>
