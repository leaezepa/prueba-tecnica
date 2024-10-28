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

// ACA FALTA EXPLICAR PORQUE SE HACEN 2 ARRAY DIFERENTES
const quickSort = (arr, key)=> {
  // para poder buscar correctamente en el listado de pokemones
  // hay que ordenarlo alfabeticamente
  // a la funcion le pasamos el array a ordenar y por qué valor ordenar ej.: name
  if (arr.length <= 1) {
    return arr;
  }
  //pivot determinara como ordenar el array
  //pivot es el ultimo elemento del array
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  // se recorre el array
  for (let i = 0; i < arr.length - 1; i++) {
    //si el elemento [i] del array con nombre [key] es menor a pivot[nombre]
    if (arr[i][key] < pivot[key]) {
      // se pushea ese nombre en el primer array
      Object.assign(arr[i],{idx:arr[i]?.url.split('/')[6]-1})

      left.push(arr[i]);
    } else {
      //sino al segundo
      Object.assign(arr[i],{idx:arr[i]?.url.split('/')[6]-1})

      right.push(arr[i]);
    }
  }
  // por ultimo retornamos un nuevo array que ordena ambos arrays al mismo tiempo
  return [...quickSort(left, key), pivot, ...quickSort(right, key)];
};
const sortPoke = ref(null)
const fxSearch = (e)=>{
  pokeStore.searchPokemon(sortPoke.value, 0, pokemonList.value?.length-1, searchModel.value);
  if(e.key === 'Backspace' || e.key === 'Delete'){
    pokeStore?.resetPokemonList();
  }
}
onMounted(()=>{
  sortPoke.value = quickSort(pokemonList.value, 'name')
})
</script>
