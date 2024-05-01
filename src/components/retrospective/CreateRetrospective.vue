<script setup lang="ts">
  import { ref } from 'vue';
  import retroApi from '../../services/retrospectiveApi';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import { useRouter } from 'vue-router';
  import RetrospectiveInputs from './RetrospectiveInputs.vue';

  const notifyStore = useNotifyStore();
  const retroStore = useRetrospectiveStore();
  const router = useRouter();

  const retroName = ref('');
  const retroDescription = ref('');
  const disableInteraction = ref(false);

  const createRetrospective = async () => {
    disableInteraction.value = true;
    const retro = await retroApi.createRetrospective(retroName.value, retroDescription.value);
    disableInteraction.value = false;

    if (retro.error)
      return notifyStore.notify(
        'An error occurred when creating the retrospective',
        NotificationType.Error,
      );

    retroStore.retrospective.createRetrospective(retro);
    router.push({ name: 'retrospective.edit', params: { id: retro.id } });
  };
</script>

<template>
  <RetrospectiveInputs
    button-label="Create retrospective"
    :retro-name="retroName"
    :disabled="disableInteraction"
    :retro-description="retroDescription"
    @clicked="createRetrospective"
    @update:retro-name="($event) => (retroName = $event)"
    @update:retro-description="($event) => (retroDescription = $event)"
  />
</template>
