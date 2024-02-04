<script setup lang="ts">
  import { ref } from 'vue';

  const retrospectiveName = ref('');
  const description = ref('');
  const disabledInteraction = ref(false);

  const createRetrospective = async () => {
    disabledInteraction.value = true;

    try {
      const apiUrl = 'http://localhost:5173';
      const response = await fetch(`${apiUrl}/retrospective`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: retrospectiveName.value,
          description: description.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create retrospective');
      }

      const responseData = await response.json();
      console.log('Retrospective created with ID:', responseData.id);
    } catch (error) {
      console.error('Error creating retrospective:', error);
    } finally {
      setTimeout(() => {
        disabledInteraction.value = false;
      }, 1000);
      console.log(retrospectiveName.value, description.value);
    }
  };
</script>

<template>
  <div class="max-w-md mx-auto relative">
    <div class="relative z-0 w-full mb-5 group">
      <input
        id="default-input"
        v-model="retrospectiveName"
        type="text"
        name="retrospective_name"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
      />
      <label
        for="default-input"
        :disabled="disabledInteraction"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Retrospective name</label
      >
    </div>
    <div class="mb-5">
      <label for="large-input" class="block mb-2 text-sm text-gray-500 dark:text-gray-400"
        >Restrospective description</label
      >
      <input
        id="large-input"
        v-model="description"
        type="text"
        :disabled="disabledInteraction"
        class="block w-full p-4 text-gray-900 border-2 border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <button
      type="button"
      :disabled="disabledInteraction"
      class="right-0 absolute text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:hover:bg-gradient-to-r disabled:opacity-75 rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      @click="createRetrospective"
    >
      Create retrospective
    </button>
  </div>
</template>
