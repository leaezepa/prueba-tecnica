<template>
  <div class="font-lato w-full min-h-screen text-center flex flex-col items-center gap-3 py-6">
    <h1 class="text-[36px] font-bold text-gray-800">Uh-oh!</h1>
    <p class="text-xl font-medium text-gray-600">You look lost on your journey!</p>
    <ButtonAll :bgColor="'bg-rose-600'" class="text-white font-bold mt-4 hover:bg-red-700">
      <router-link :to="'/'">
        Go back home
      </router-link>
    </ButtonAll>
  </div>
</template>

<script setup>
import ButtonAll from '@/components/ButtonAll.vue'
</script>
