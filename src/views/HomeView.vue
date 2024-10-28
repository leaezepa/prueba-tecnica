<template>
  <div class="w-full m-auto max-w-[570px] px-6 py-6 md:px-0 font-lato">
    <div class="h-full flex flex-col text-center items-center gap-10 py-10">
      <img src="@/assets/pikachu.png" class="" loading="lazy"/>
      <h1 class="font-bold text-gray-800 text-[26px]">Welcome to Pokédex</h1>
      <p class="text-gray-600 font-medium text-[18px]">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
      <ButtonAll :bgColor="'bg-rose-600'" class="mt-4 hover:bg-red-700">
        <router-link :to="'/list'"><span class="text-white font-bold">Get started</span></router-link>
      </ButtonAll>
    </div>
  </div>
</template>

<script setup>
import ButtonAll from '@/components/ButtonAll.vue'
</script>
