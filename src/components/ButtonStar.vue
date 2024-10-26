<template>
  <div class="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-full">
    <Icon icon="fa-solid:star" :class="`w-[26px] h-[26px] ${active ? 'text-yellow-600' : 'text-gray-400'}`" />
  </div>
</template>

<script setup>
import {Icon} from '@iconify/vue'

const props = defineProps({
  active: Boolean
})
</script>
