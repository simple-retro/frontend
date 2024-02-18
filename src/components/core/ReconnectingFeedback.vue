<template>
  <div class="fixed top-0 left-0 w-full h-full bg-white bg-opacity-85 z-40 cursor-wait">
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-center"
    >
      <h1 class="text-3xl font-bold mb-4">You have been disconnected</h1>

      <p class="text-lg mb-4">Please wait while we reconnect you...</p>

      <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-black" />
    </div>
  </div>
</template>
