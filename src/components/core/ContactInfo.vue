<script setup lang="ts">
  import GithubIcon from '../icons/GithubIcon.vue';
  import LinkedinIcon from '../icons/LinkedinIcon.vue';
  import WebsiteIcon from '../icons/WebsiteIcon.vue';

  defineProps<{
    name: string;
    role: string;
    avatar: string;
    githubUser?: string;
    linkedinUser?: string;
    websiteLink?: string;
  }>();
</script>

<template>
  <div class="flex items-center gap-4">
    <img class="w-10 h-10 rounded-full" :src="avatar" alt="" />
    <div class="font-medium flex-auto">
      <div>{{ name }}</div>
      <div class="text-sm text-gray-500">{{ role }}</div>
    </div>
    <div class="text-gray-500 flex gap-3">
      <a
        v-if="githubUser"
        target="_blank"
        :href="`https://github.com/${githubUser}`"
        class="hover:text-gray-900"
      >
        <GithubIcon />
      </a>
      <a
        v-if="linkedinUser"
        target="_blank"
        :href="`https://www.linkedin.com/in/${linkedinUser}/`"
        class="hover:text-gray-900"
      >
        <LinkedinIcon />
      </a>
      <a v-if="websiteLink" target="_blank" :href="`${websiteLink}`" class="hover:text-gray-900">
        <WebsiteIcon />
      </a>
    </div>
  </div>
</template>
