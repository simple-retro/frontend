<script setup lang="ts">
  import type { KnownRetro } from '../../stores/retrospectiveStore';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  defineProps<{ retros: KnownRetro[] }>();

  const redirectToRetro = (retroId: string) => {
    router.push({ name: 'retrospective.view', params: { id: retroId } });
  };
</script>

<template>
  <div class="container grid gap-4 px-4 py-8 md:py-12 md:px-6">
    <h3 class="text-center text-3xl font-bold">Known Retrospectives</h3>
    <div class="relative w-full overflow-auto">
      <table class="w-full caption-bottom text-sm">
        <thead>
          <tr class="border-b-2">
            <th class="h-12 px-4 text-left">Retro ID</th>
            <th class="h-12 px-4 text-left">Retro name</th>
            <th class="h-12 px-4 text-left">Last access</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="retro in retros"
            :key="retro.id"
            class="border-t hover:bg-slate-100 cursor-pointer"
            @click="redirectToRetro(retro.id)"
          >
            <td class="p-4">{{ retro.id }}</td>
            <td class="p-4">{{ retro.name }}</td>
            <td class="p-4">
              {{ new Date(retro.lastAccess).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
