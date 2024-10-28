<template>
  <button
    :class="`${disabled ? '' : 'cursor-pointer'} rounded-full px-5 py-[11px] h-11 flex items-center justify-center gap-2 ${bgColor}`"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  active: Boolean,
  bgColor: String,
  disabled: Boolean,
})
</script>
