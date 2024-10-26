<template>
  <div class="bg-white w-full fixed bottom-0 left-0 h-20 flex items-center justify-center">
    <div class="absolute w-full h-2 bg-gradient-to-t from-gray-300 to-transparent -top-2"></div>
    <div class="w-full max-w-[570px] mx-auto flex items-center justify-center gap-4">
      <Button :active="isActive" :bgColor="'bg-rose-600'" :bgHoverColor="'bg-red-700'" :bgInactiveColor="'bg-gray-400'" class="min-w-[150px] lg:min-w-[275px]">
        <Icon icon="fa-solid:list" class="w-[22px] h-[22px] text-white"/>
        <span class="font-lato font-bold text-white">All</span>
      </Button>
      <Button :active="isActive" :bgColor="'bg-rose-600'" :bgHoverColor="'bg-red-700'" :bgInactiveColor="'bg-gray-400'" class="min-w-[150px] lg:min-w-[275px]">
        <Icon icon="fa-solid:star" class="w-[22px] h-[22px] text-white" />
        <span class="font-lato font-bold text-white">Favorites</span>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue'
import Button from '@/components/ButtonAll.vue'

const isActive = ref(false);
</script>
