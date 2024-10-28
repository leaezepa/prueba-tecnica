<template>
  <section class="relative w-full h-full mx-auto max-w-[570px] px-6 py-6 md:px-0">
    <SearchInput v-if="!isLoading" />
    <PokeList v-if="!notFound">
      <template v-if="bottomBar?.isActiveList">
        <template v-for="(poke, idx) in pokemon?.results" :key="poke?.name">
          <CustomTransition :delayDuration="`${100*idx}ms`">
            <PokeItem :name="poke" :idx="idx" :idPoke="parseInt(poke?.url.split('/')[6])" :inFavorites="poke?.favorite"
                      @openModal="showModalFx" @click="getclickedPokeData(poke, poke?.favorite)" />
          </CustomTransition>
        </template>
      </template>
      <template v-else>
        <template v-for="(poke, idx) in favorites" :key="poke?.name">
          <CustomTransition :delayDuration="`${100*idx}ms`">
            <PokeItem :name="poke" :idx="poke?.favorite-1" :idPoke="parseInt(poke?.url.split('/')[6])"
                      :inFavorites="poke?.favorite" @openModal="showModalFx"
                      @click="getclickedPokeData(poke, poke?.favorite)" />
          </CustomTransition>
        </template>
      </template>
    </PokeList>
    <NoResult v-else />
    <BottomBar v-if="!notFound" ref="bottomBar" />
    <PokeModal :show="open" @close="open = false" :pokeInfo="clickedPoke" :favorited="isInFavs" :location="bottomBar?.isActiveFavs"/>
  </section>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { usePokeStore } from '@/stores/pokemon.store.js';
import { storeToRefs } from 'pinia';
import CustomTransition from '@/components/CustomTransition.vue'

const SearchInput = defineAsyncComponent(()=>import( '@/components/SearchInput.vue'));
const PokeList = defineAsyncComponent(()=>import( '@/components/PokeList.vue'));
const PokeItem = defineAsyncComponent(()=>import( '@/components/PokeItem.vue'));
const BottomBar = defineAsyncComponent(()=>import( '@/components/BottomBar.vue'));
const NoResult = defineAsyncComponent(()=>import( '@/components/NoResult.vue'));
const PokeModal = defineAsyncComponent(()=>import( '@/components/PokeModal.vue'));

const pokeStore = usePokeStore();
const { pokemon, stats, favorites, notFound } = storeToRefs(pokeStore);
const isLoading = ref(true);
const open = ref(false);
const clickedPoke = ref(null);
const bottomBar = ref(null);
const isInFavs = ref(false);

const getPokemons = async () => {
  await pokeStore.getAllPokemon();
}
const getclickedPokeData = async(i, favorite)=>{
  isInFavs.value = favorite != null;
  await pokeStore.getPokemonStats(i?.name);
  clickedPoke.value = stats.value;
}
const showModalFx = ()=>{
  open.value = true;
}
await getPokemons().then(()=>{
  isLoading.value = false
});
</script>
