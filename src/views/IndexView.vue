<template>
  <section class="relative w-full mx-auto max-w-[570px] px-6 py-6 md:px-0">
    <SearchInput v-if="!isLoading"/>
    <PokeList v-if="!notFound">
      <template v-for="poke in pokemon?.results" :key="poke?.name">
        <PokeItem :name="poke?.name"/>
      </template>
    </PokeList>
    <BottomBar/>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePokeStore } from '@/stores/pokemon.store.js';
import { storeToRefs } from 'pinia';
import SearchInput from '@/components/SearchInput.vue';
import PokeList from '@/components/PokeList.vue';
import PokeItem from '@/components/PokeItem.vue';
import BottomBar from '@/components/BottomBar.vue'

const pokeStore = usePokeStore();
const { pokemon, notFound } = storeToRefs(pokeStore);
const isLoading = ref(true);

const getPokemons = async () => {
  await pokeStore.getAllPokemon();
}

onMounted(async () => {
  await getPokemons().then(()=>{
    isLoading.value = false
  });
})
</script>
