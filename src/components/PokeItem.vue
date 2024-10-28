<template>
  <div class="bg-white hover:bg-gray-200 cursor-pointer h-[60px] rounded pl-6 pr-2">
    <div class="w-full h-full flex items-center justify-between">
      <span class="w-full h-full flex items-center font-lato font-medium text-[22px] capitalize" @click="emitShowModal">{{ name?.name }}</span>
      <ButtonStar @click="addToFavs(name)" :active="(inFavorites != null)" class="relative z-10 flex-shrink-0"/>
    </div>
  </div>
</template>

<script setup>
import { usePokeStore } from '@/stores/pokemon.store.js';
import ButtonStar from '@/components/ButtonStar.vue';
const emit = defineEmits(['openModal',]);
const props =defineProps({
  name:Object,
  idx:Number,
  inFavorites:[Number, null],
  idPoke:Number
})
const pokeStore = usePokeStore();
const emitShowModal = ()=>{
  emit('openModal')
};
const addToFavs = (poke)=>{
  pokeStore.addPokeToFavorites(poke, props.idx, props.idPoke);
}
</script>
