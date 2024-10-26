<template>
  <div class="bg-white rounded shadow-[0_2px_10px_-8px_rgba(0,0,0,0.3)] flex items-center p-4">
    <Icon icon="fa-solid:search" class="w-[18px] h-[18px] text-gray-400 flex-shrink-0"/>
    <input type="text" class="px-4 focus:outline-0 w-full font-montserrat text-base" placeholder="Search" v-model="searchModel" @keyup="fxSearch">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import {usePokeStore} from '@/stores/pokemon.store.js';
import {storeToRefs} from 'pinia';

const searchModel = ref(null);
const pokeStore = usePokeStore();
const { pokemon, pokemonList } = storeToRefs(pokeStore);

const quickSort = (arr, key)=> {
  if (arr.length <= 1) {
    return arr;
  }
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i][key] < pivot[key]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left, key), pivot, ...quickSort(right, key)];
};
const sortPoke = ref(null)
const fxSearch = (e)=>{
  pokeStore.searchPokemon(sortPoke.value, 0, pokemonList.value?.length-1, searchModel.value);
  if(e.key === 'Backspace'){
    pokeStore?.resetPokemonList();
  }
}
onMounted(()=>{
  sortPoke.value = quickSort(pokemonList.value, 'name')
})
</script>
