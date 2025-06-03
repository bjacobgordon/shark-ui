<script setup lang="ts">
import {
  String,
} from 'effect';

import {
  VTextarea,
} from 'vuetify/components/VTextarea';

import type {
  ValidationResult,
} from 'vuetify/lib/composables/validation.mjs';

import NonTrivialString from '@/library/NonTrivialString';

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

const mustBeNonTrivialWhenProvided = (
  givenSubject: string,
): ValidationResult => {
  if (
    String.isEmpty(givenSubject)
  ) return true;

  return !NonTrivialString.is(givenSubject) || 'Must contain more than just whitespace.';
};
</script>

<template>
  <VTextarea
    v-model="currentText"
    :label
    :placeholder
    :rows
    :max-rows
    :rules="[
      mustBeNonTrivialWhenProvided,
    ]"
    auto-grow
    hide-details
  />
</template>
