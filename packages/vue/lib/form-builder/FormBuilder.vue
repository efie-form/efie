<template>
  <div
    :id="DIV_ID"
    ref="containerRef"
    :style="{
      height: `${height}px`,
      width: '100%',
      overflow: 'hidden',
    }"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { BuilderExternal, type FormSchema } from '@efie-form/core';

const DIV_ID = 'efie-form-builder';

export default defineComponent({
  name: 'FormBuilder',
  props: {
    height: {
      type: Number,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    onReady: {
      type: Function,
      default: () => {},
    },
  },
  setup(props, { expose }) {
    const containerRef = ref<HTMLDivElement | null>(null);
    const builderRef = ref<BuilderExternal | null>(null);

    onMounted(() => {
      if (containerRef.value && !builderRef.value) {
        builderRef.value = new BuilderExternal({
          id: DIV_ID,
        });
      }
    });

    onUnmounted(() => {
      if (builderRef.value) {
        const container = document.getElementById(DIV_ID);
        if (container) {
          container.innerHTML = '';
        }
        builderRef.value = null;
      }
    });

    watch(
      () => props.height,
      (newHeight) => {
        if (builderRef.value) {
          builderRef.value.setHeight(newHeight);
        }
      }
    );

    // Expose methods to parent component
    expose({
      loadSchema: (schema: FormSchema) => {
        builderRef.value?.loadSchema(schema);
      },
      getSchema: () => {
        return builderRef.value?.getValue() as FormSchema;
      },
    });

    return {
      containerRef,
      DIV_ID,
    };
  },
});
</script>
