<script setup lang="ts">
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { NotificationType, useNotifyStore } from '../../stores/notifyStore';
  import { useRetrospectiveStore } from '../../stores/retrospectiveStore';
  import retrospectiveApi from '../../services/retrospectiveApi';
  import { ExportType } from '../../services/index';
  import DownloadIcon from '../icons/DownloadIcon.vue';
  import BaseButton from './BaseButton.vue';
  import logger from '../../services/logger';

  const notifyStore = useNotifyStore();
  const retroStore = useRetrospectiveStore();

  const showDropdown = ref(false);
  const isExporting = ref(false);
  const containerRef = ref<HTMLElement | null>(null);

  const exportOptions: { label: string; type: ExportType; extension: string }[] = [
    { label: 'JSON', type: 'JSON', extension: 'json' },
    { label: 'Markdown', type: 'MARKDOWN', extension: 'md' },
    { label: 'PDF', type: 'PDF', extension: 'pdf' },
  ];

  const handleExport = async (exportType: ExportType, extension: string) => {
    if (!retroStore.currentRetro?.id) return;

    isExporting.value = true;
    showDropdown.value = false;

    const result = await retrospectiveApi.exportRetrospective(
      retroStore.currentRetro.id,
      exportType,
    );

    isExporting.value = false;

    if (result.error) {
      logger.error('Error exporting retrospective');
      notifyStore.notify('Failed to export retrospective', NotificationType.Error);
      return;
    }

    const filename = `retrospective-${retroStore.currentRetro.name.replace(/ /g, '_')}.${extension}`;
    const url = window.URL.createObjectURL(result);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    notifyStore.notify('Retrospective exported successfully!', NotificationType.Success);
  };

  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
      showDropdown.value = false;
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<template>
  <div ref="containerRef" class="relative">
    <BaseButton
      class="font-bold flex gap-2"
      :style="'WHITE'"
      :disabled="isExporting"
      @click="toggleDropdown"
    >
      <DownloadIcon :size="18" />
      {{ isExporting ? 'Exporting...' : 'Export' }}
    </BaseButton>

    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10"
    >
      <button
        v-for="option in exportOptions"
        :key="option.type"
        class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
        @click="handleExport(option.type, option.extension)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
