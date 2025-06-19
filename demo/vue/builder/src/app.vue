<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { FormBuilder } from '@efie-form/vue';
import { schema } from './schema';

const formBuilderRef = ref<InstanceType<typeof FormBuilder> | null>(null);
const height = ref(window.innerHeight);

let resizeTimeout: NodeJS.Timeout;
const handleResize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    height.value = window.innerHeight;
  }, 100);
};

const handleReady = () => {
  formBuilderRef.value?.loadSchema(schema);
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  clearTimeout(resizeTimeout);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <FormBuilder ref="formBuilderRef" :height="height" :onReady="handleReady" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
