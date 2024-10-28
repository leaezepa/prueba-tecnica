<template>
  <div
    class="bg-white w-full fixed z-20 bottom-0 left-0 h-20 flex items-center justify-center"
  >
    <div
      class="absolute w-full h-2 bg-gradient-to-t from-gray-300 to-transparent -top-2"
    ></div>
    <div
      class="w-full max-w-[570px] mx-auto flex items-center justify-center gap-4"
    >
      <Button
        :active="isActiveList"
        :bgColor="`${isActiveList ? 'bg-rose-600' : 'bg-gray-400'}`"
        class="min-w-[150px] lg:min-w-[275px]"
        @click="(isActiveList = true), (isActiveFavs = false)"
      >
        <Icon icon="fa-solid:list" class="w-[22px] h-[22px] text-white" />
        <span class="font-lato font-bold text-white">All</span>
      </Button>
      <Button
        :active="isActiveFavs"
        :bgColor="`${isActiveFavs ? 'bg-rose-600' : 'bg-gray-400'}`"
        class="min-w-[150px] lg:min-w-[275px]"
        @click="(isActiveFavs = true), (isActiveList = false)"
        :disabled="!favorites?.length > 0"
      >
        <Icon icon="fa-solid:star" class="w-[22px] h-[22px] text-white" />
        <span class="font-lato font-bold text-white">Favorites</span>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import Button from '@/components/ButtonAll.vue'
import { usePokeStore } from '@/stores/pokemon.store.js'
import { storeToRefs } from 'pinia'

const pokeStore = usePokeStore()
const { favorites } = storeToRefs(pokeStore)
const isActiveList = ref(true)
const isActiveFavs = ref(false)

watch(favorites?.value, () => {
  if (favorites.value?.length === 0) {
    isActiveFavs.value = false
    isActiveList.value = true
  }
})
defineExpose({ isActiveList, isActiveFavs })
</script>
