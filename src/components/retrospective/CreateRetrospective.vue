<script setup lang="ts">
  import { ref } from 'vue';
  import retroApi from '../../services/retrospectiveApi';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import { useRouter } from 'vue-router';
  import BaseButton from '../core/BaseButton.vue';

  const notifyStore = useNotifyStore();
  const retroStore = useRetrospectiveStore();
  const router = useRouter();

  const retroName = ref('');
  const retroDescription = ref('');
  const disabledInteraction = ref(false);

  const createRetrospective = async () => {
    disabledInteraction.value = true;

    const retro = await retroApi.createRetrospective(retroName.value, retroDescription.value);

    disabledInteraction.value = false;

    if (retro.error) return notifyStore.notify('An error ocrured', NotificationType.Error);

    retroStore.retrospective.updateRetrospective(retro);
    router.push({ name: 'retrospective.view', params: { id: retro.id } });
  };
</script>

<template>
  <div class="relative w-full">
    <div class="mb-5">
      <input
        id="default-input"
        v-model="retroName"
        type="text"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
        required
      />
      <label
        for="default-input"
        :disabled="disabledInteraction"
        class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Retrospective name</label
      >
    </div>
    <div class="mb-5">
      <label for="large-input" class="block mb-2 text-sm text-gray-500"
        >Restrospective description</label
      >
      <textarea
        id="large-input"
        v-model="retroDescription"
        type="text"
        :disabled="disabledInteraction"
        class="block w-full p-4 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <BaseButton
      :disabled="disabledInteraction || retroName.length < 4"
      class="right-0 absolute w-full"
      @click="createRetrospective"
    >
      Create retrospective
    </BaseButton>
  </div>
</template>
