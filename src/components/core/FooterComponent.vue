<script setup lang="ts">
  import { ref } from 'vue';
  import ModalifyComponent from './ModalifyComponent.vue';
  import GithubIcon from '../icons/GithubIcon.vue';
  import UserIcon from '../icons/UserIcon.vue';
  import ContactInfo from './ContactInfo.vue';
  import { RouterLink } from 'vue-router';
  const isOpen = ref(false);
</script>

<template>
  <footer class="w-full bg-white bottom-0 flex">
    <div class="w-full mx-auto py-4 self-end">
      <div class="mx-6 sm:flex sm:items-center sm:justify-between">
        <RouterLink
          :to="{ name: 'home' }"
          class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
        >
          <img src="/logo_nobg.png" class="h-8" alt="Simple Retro Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap">Simple Retro</span>
        </RouterLink>
        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
          <li>
            <a
              target="_blank"
              href="https://github.com/simple-retro"
              class="hover:underline hover:text-gray-900 me-4 md:me-6 flex gap-2"
            >
              <GithubIcon extra-classes="w-4 h-4 self-center" />
              Github
            </a>
          </li>
          <li>
            <button
              class="hover:underline hover:text-gray-900 flex gap-2"
              @click="isOpen = !isOpen"
            >
              <UserIcon extra-classes="w-4 h-4 self-center" />
              Contact
            </button>
          </li>
        </ul>
      </div>
      <hr class="my-2 border-gray-200 sm:mx-auto lg:my-2" />
      <span class="block text-sm text-gray-500 sm:text-center">
        © {{ new Date().getFullYear() }}
        <RouterLink :to="{ name: 'home' }" class="hover:underline">Simple Retro</RouterLink>
      </span>
    </div>
  </footer>
  <ModalifyComponent
    v-if="isOpen"
    extra-classes="py-8 flex flex-col gap-4 cursor-default"
    @close="isOpen = !isOpen"
  >
    <ContactInfo
      name="Felipe Fernandes"
      role="Backend"
      avatar="https://avatars.githubusercontent.com/u/46628384?s=64v=4"
      github-user="Mewbi"
      linkedin-user="felipe-fernandes-gsc"
      website-link="https://mewbi.github.io"
    ></ContactInfo>
    <ContactInfo
      name="Filipe Abrão"
      role="Backend"
      avatar="https://avatars.githubusercontent.com/u/26333901?s=64&v=4"
      github-user="Termack"
      linkedin-user="filipe-abrao"
      website-link="https://termack.github.io"
    ></ContactInfo>
    <ContactInfo
      name="Kauã Barbosa"
      role="Frontend"
      avatar="https://avatars.githubusercontent.com/u/89055714?s=64&v=4"
      github-user="devkauab"
      website-link="https://kauabarbosa.dev"
      linkedin-user="kauã-barbosa-do-nascimento-3b9832231"
    ></ContactInfo>
    <ContactInfo
      name="Luan Caliel"
      role="Frontend"
      avatar="https://avatars.githubusercontent.com/u/59155752?s=64&v=4"
      github-user="ySnoopyDogy"
      linkedin-user="luan-caliel"
      website-link="https://menherabot.xyz"
    ></ContactInfo>
  </ModalifyComponent>
</template>
