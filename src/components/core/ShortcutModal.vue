<script setup lang="ts">
  import { ref, watch } from 'vue';
  import ModalifyComponent from './ModalifyComponent.vue';
  import { useRouter } from 'vue-router';

  const exampleRetroId = '018d9107-4358-716f-b4aa-76cdb66f2a7e';

  const router = useRouter();

  const retroIdInput = ref();
  const retroId = ref('');
  const isOpen = ref(false);

  const closeModal = () => {
    isOpen.value = false;
    retroId.value = '';
  };

  const openModal = () => {
    isOpen.value = true;

    const interval = setInterval(() => {
      if (retroIdInput.value) {
        retroIdInput.value.focus();
        clearInterval(interval);
      }
    }, 1);
  };

  const jumpToRetro = async () => {
    if (retroId.value.length !== exampleRetroId.length) return;

    router.push({ name: 'retrospective.view', params: { id: retroId.value } });
    closeModal();
  };

  const watchRetroId = () => {
    if (retroId.value.length === exampleRetroId.length) jumpToRetro();
  };

  watch(retroId, watchRetroId);
  defineExpose({ openModal });
</script>

<template>
  <ModalifyComponent v-if="isOpen" @close="closeModal">
    <label for="retroId" class="block mb-2 text-md font-bold text-gray-900">
      Enter a retrospective ID
    </label>

    <input
      id="retroId"
      ref="retroIdInput"
      v-model="retroId"
      rows="4"
      class="block mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
      :placeholder="exampleRetroId"
      @keydown.enter="jumpToRetro"
    />
  </ModalifyComponent>
</template>
