<template>
  <div class="bg-white cursor-pointer flex items-center justify-between h-[60px] rounded pl-6 pr-2">
    <span class="font-lato font-medium text-[22px] capitalize">{{name}}</span>
    <ButtonStar/>
  </div>
</template>

<script setup>
import ButtonStar from '@/components/ButtonStar.vue';

const props =defineProps({
  name:String,
})
</script>
