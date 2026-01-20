<script setup lang="ts">
  import HeartIcon from '../icons/HeartIcon.vue';

  defineProps<{ voted: boolean; votes: number }>();

  const emit = defineEmits<{ voteChange: [] }>();

  const handleVote = () => emit('voteChange');
</script>

<template>
  <div class="flex items-center gap-3">
    <button
      :title="voted ? `Unvote` : `Vote`"
      class="p-2 rounded-full transition-all duration-200 group"
      :class="[
        voted ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'hover:bg-gray-100 text-gray-500',
      ]"
      aria-label="Like"
      @click.stop="handleVote"
    >
      <HeartIcon
        class="w-5 h-5 transition-transform group-active:scale-90"
        :class="{ 'fill-current': voted }"
      />
    </button>

    <div class="flex-1">
      <span class="font-medium text-base text-gray-500">
        {{ votes }}
      </span>
    </div>
  </div>
</template>
