<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      appear
    >
      <div
        class="fixed inset-0 z-30 overflow-y-auto bg-gray-800/60"
        ref="modal-backdrop"
        v-show="showModal"
      >
        <div class="flex items-center justify-center px-6 md:px-0 min-h-screen">
          <div
            class="bg-white rounded relative w-full max-w-[570px] h-full overflow-hidden"
            role="dialog"
            ref="modal"
            aria-modal="true"
          >
            <button @click="closeModal" class="absolute right-4 top-4 z-20">
              <img src="@/assets/close.png" />
            </button>
            <div class="relative w-full h-[220px]">
              <img
                loading="lazy"
                :src="
                  pokeInfo?.sprites?.other?.['official-artwork']?.front_default
                "
                class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[180px]"
              />
              <img
                loading="lazy"
                src="@/assets/background.png"
                class="w-full h-full object-cover"
              />
            </div>
            <div
              class="w-full flex flex-col gap-2 px-6 py-4 font-lato text-gray-600"
            >
              <div class="relative pb-2">
                <p class="font-bold">
                  Name:
                  <span class="font-medium capitalize">{{
                    pokeInfo?.name
                  }}</span>
                </p>
                <div class="absolute bottom-0 w-full h-[1px] bg-gray-300"></div>
              </div>
              <div class="relative pb-2">
                <p class="font-bold">
                  Weight:
                  <span class="font-medium">{{ pokeInfo?.weight }}</span>
                </p>
                <div class="absolute bottom-0 w-full h-[1px] bg-gray-300"></div>
              </div>
              <div class="relative pb-2">
                <p class="font-bold">
                  Height:
                  <span class="font-medium">{{ pokeInfo?.height }}</span>
                </p>
                <div class="absolute bottom-0 w-full h-[1px] bg-gray-300"></div>
              </div>
              <div class="relative pb-2">
                <p class="font-bold">
                  Types:
                  <span
                    class="font-medium capitalize"
                    v-for="(type, idx) in pokeInfo?.types"
                    :key="idx"
                    >{{ type?.type?.name
                    }}{{
                      idx === pokeInfo?.types?.length - 1 ? '' : ', '
                    }}</span
                  >
                </p>
                <div class="absolute bottom-0 w-full h-[1px] bg-gray-300"></div>
              </div>
              <div class="flex items-center justify-between mt-2">
                <ButtonAll
                  :bgColor="'bg-rose-600'"
                  class="text-white font-bold w-[195px] overflow-hidden hover:bg-red-700"
                  @click="copyToClipboard"
                >
                  <Transition mode="out-in" name="slide">
                    <span v-if="!copied">Share to my friends</span>
                    <span v-else>Copied to clipboard</span>
                  </Transition>
                </ButtonAll>
                <ButtonStar
                  class="cursor-pointer"
                  @click="addToFavs(pokeInfo)"
                  :active="added || favorited"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active{
  opacity:1;
  transition: all 200ms ease-in-out;
}
.slide-enter-from,
.slide-leave-to{
  opacity: 0;
  transform: translateY(20px);
}
</style>

<script setup>
import { defineAsyncComponent, ref, watch } from 'vue'
import { usePokeStore } from '@/stores/pokemon.store.js'
import ButtonAll from './ButtonAll.vue'
import { storeToRefs } from 'pinia'
const emit = defineEmits(['close', 'changeLocation'])
const props = defineProps({
  show: Boolean,
  pokemonData: Object,
  pokeInfo: Object,
  favorited: Boolean,
  location: Boolean,
})
const ButtonStar = defineAsyncComponent(()=>import( '@/components/ButtonStar.vue'));
const pokeStore = usePokeStore()
const { pokemon } = storeToRefs(pokeStore)
const showModal = ref(false)
const added = ref(props.favorited)
const removedFromFavs = ref(false)
const copied = ref(false)

const closeModal = () => {
  showModal.value = false
  added.value = false
  emit('close')
}
const addToFavs = poke => {
  removedFromFavs.value = pokeStore.addPokeToFavorites(
    poke,
    pokemon.value?.results?.length === 1 ? 0 : props.pokeInfo?.id - 1,
    props.pokeInfo?.id,
  )
  if (removedFromFavs.value && props.location) {
    added.value = false
    closeModal()
    return
  }
  added.value = !added.value
}
const copyToClipboard = () => {
  var copyText = `Name: ${props.pokeInfo?.name}, Weight: ${props.pokeInfo?.weight}, Height: ${props.pokeInfo?.height}, Types: ${props.pokeInfo?.types
    .map(e => {
      return e.type?.name
    })
    .toString()}`
  navigator.clipboard.writeText(copyText)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

watch(
  () => props.show,
  val => {
    showModal.value = val
  },
)
</script>
