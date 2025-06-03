<script setup lang="ts">
import {
  VTextarea,
} from 'vuetify/components/VTextarea';

const currentText = defineModel<string>({
  required: true,
});

withDefaults(
  defineProps<{
    label: string;
    placeholder: string;
    rows?: number;
    maxRows?: number;
  }>(),
  {
    rows   : 3,
    maxRows: 10,
  },
);
</script>

<template>
  <VTextarea
    v-model="currentText"
    :label
    :placeholder
    :rows
    :max-rows
    auto-grow
    hide-details
  />
</template>
