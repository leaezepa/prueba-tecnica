<template>
  <div class="w-11 h-11 flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-full">
    <Transition mode="out-in" name="pop" appear>
      <Icon icon="fa-solid:star" class="w-[26px] h-[26px] text-yellow-600" v-if="active"/>
    </Transition>
    <Icon icon="fa-solid:star" class="w-[26px] h-[26px] text-gray-400" v-if="!active"/>
  </div>
</template>

<style scoped>

.pop-enter-active{
  animation: bounce-in 0.5s;
}
.pop-leave-active{
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<script setup>
import {Icon} from '@iconify/vue'

const props = defineProps({
  active: Boolean
})
</script>
