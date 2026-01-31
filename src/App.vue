<script setup lang="ts">
  import NotifyToast from './components/core/NotifyToast.vue';
  import FooterComponent from './components/core/FooterComponent.vue';
  import ShortcutModal from './components/core/ShortcutModal.vue';
  import { RouterView } from 'vue-router';
  import { onBeforeUnmount, onMounted, ref } from 'vue';

  const shortcutRef = ref();

  const handleShortcut = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === ' ' && shortcutRef.value) shortcutRef.value.openModal();
  };

  onMounted(() => {
    window.addEventListener('keydown', handleShortcut);

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleShortcut);
    });
  });
</script>

<template>
  <div>
    <ShortcutModal ref="shortcutRef" />
    <NotifyToast class="fixed bottom-0 left-0 z-50 p-4" />
    <div class="container flex flex-col mx-auto px-4 pt-8 md:pt-12 md:px-6 min-h-screen">
      <div class="grow">
        <RouterView />
      </div>
      <FooterComponent />
    </div>
  </div>
</template>
