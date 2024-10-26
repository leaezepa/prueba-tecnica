<template>
  <section class="relative w-full h-full mx-auto max-w-[570px] px-6 py-6 md:px-0">
    <SearchInput v-if="!isLoading"/>
    <PokeList v-if="!notFound">
      <template v-for="poke in pokemon?.results" :key="poke?.name">
        <PokeItem :name="poke?.name" @openModal="showModalFx"/>
      </template>
    </PokeList>
    <NoResult v-else/>
    <BottomBar v-if="!notFound"/>
  </section>
  <PokeModal :show="open"/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePokeStore } from '@/stores/pokemon.store.js';
import { storeToRefs } from 'pinia';
import SearchInput from '@/components/SearchInput.vue';
import PokeList from '@/components/PokeList.vue';
import PokeItem from '@/components/PokeItem.vue';
import BottomBar from '@/components/BottomBar.vue';
import NoResult from '@/components/NoResult.vue';
import PokeModal from '@/components/PokeModal.vue'

const pokeStore = usePokeStore();
const { pokemon, notFound } = storeToRefs(pokeStore);
const isLoading = ref(true);
const open = ref(false);

const getPokemons = async () => {
  await pokeStore.getAllPokemon();
}

const showModalFx = ()=>{
  open.value = true;
}

onMounted(async () => {
  await getPokemons().then(()=>{
    isLoading.value = false
  });
})
</script>
