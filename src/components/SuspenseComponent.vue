<template>
  <Suspense>
    <template #fallback>
      <div class="flex items-center justify-center min-h-screen">
        <img src="@/assets/loader.png" alt="loader" class="animate-spin"/>
      </div>
    </template>
    <template #default>
      <AsyncComponent/>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('@/views/IndexView.vue'));
    }, 2000); // Simulates a network delay
  })
);
</script>
