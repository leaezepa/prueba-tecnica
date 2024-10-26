<template>
  <div :class="`cursor-pointer rounded-full px-5 py-[11px] h-11 flex items-center justify-center gap-2 ${bgColor} hover:${bgHoverColor}`">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  active: Boolean,
  bgColor: String,
  bgHoverColor: String,
  bgInactiveColor: String,
})
</script>

