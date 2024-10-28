<template>
  <Transition
    :enter-from-class="`opacity-0 translate-y-10`"
    enter-to-class="opacity-100 translate-y-0"
    enter-active-class="transition-all duration-500"
    :leave-from-class="`opacity-100 translate-y-0`"
    leave-to-class="opacity-0 translate-y-10"
    leave-active-class="transition-all duration-500"
    @before-enter="applyDelay"
    @after-enter="clearDelay"
    appear>
    <slot></slot>
  </Transition>
</template>

<script setup>
import {ref} from 'vue';
const props = defineProps({
  delayDuration:String
})
const slotStyles = ref({});

function applyDelay(el) {
  slotStyles.value = { transitionDelay: props.delayDuration };
  el.style.transitionDelay = props.delayDuration;
}

function clearDelay(el) {
  el.style.transitionDelay = '0ms';
}
</script>

