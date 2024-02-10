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
  const disableIntearction = ref(false);

  const createRetrospective = async () => {
    disableIntearction.value = true;

    const retro = await retroApi.createRetrospective(retroName.value, retroDescription.value);

    disableIntearction.value = false;

    if (retro.error) return notifyStore.notify('An error ocrured', NotificationType.Error);

    retroStore.retrospective.updateRetrospective(retro);
    router.push({ name: 'retrospective.view', params: { id: retro.id } });
  };
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="name" class="text-md font-bold text-gray-900">Name</label>
    <input
      id="name"
      v-model="retroName"
      :disabled="disableIntearction"
      rows="4"
      class="flex p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
      placeholder="When you were a child..."
    />

    <label for="description" class="text-md font-bold text-gray-900">Description</label>
    <textarea
      id="description"
      v-model="retroDescription"
      :disabled="disableIntearction"
      rows="4"
      class="flex mb-5 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75"
      placeholder="Retrospective to talk about sprint 123, gather some feedback and be better!"
    />

    <BaseButton
      :disabled="disableIntearction || retroName.length < 5"
      class="w-full"
      @click="createRetrospective"
    >
      Create retrospective
    </BaseButton>
  </div>
</template>
