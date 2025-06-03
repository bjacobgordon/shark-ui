<script setup lang="ts">
import {
  ref,
  set,
  type Ref,
  computed,
  watch,
} from '@/library/vue';

import {
  type Option,
  String,
} from 'effect';

import {
  VTextarea,
} from 'vuetify/components/VTextarea';

import type {
  ValidationResult,
} from 'vuetify/lib/composables/validation.mjs';

import NonTrivialString from '@/library/NonTrivialString';

const exposedText = defineModel<Option.Option<NonTrivialString>>({
  required: true,
});

const given = withDefaults(
  defineProps<{
    label: string;
    placeholder: string;
    required?: boolean;
    rows?: number;
    maxRows?: number;
  }>(),
  {
    rows   : 3,
    maxRows: 10,
  },
);

const currentText: Ref<string> = ref('');

watch(
  currentText,
  (updatedText) => {
    set(exposedText, NonTrivialString.option(updatedText));
  },
  {
    immediate: true,
  },
);

const mustBeProvided = (
  givenSubject: string,
): ValidationResult => {
  return !String.isEmpty(givenSubject) || 'This field is required.';
};

const mustBeNonTrivialWhenProvided = (
  givenSubject: string,
): ValidationResult => {
  if (
    String.isEmpty(givenSubject)
  ) return true;

  return !NonTrivialString.is(givenSubject) || 'Must contain more than just whitespace.';
};

const derivedRules = computed(() => {
  const runningRules = [mustBeNonTrivialWhenProvided];

  if (
    given.required
  ) runningRules.unshift(mustBeProvided);

  return runningRules;
});
</script>

<template>
  <VTextarea
    v-model="currentText"
    :label
    :placeholder
    :rows
    :max-rows
    :rules="derivedRules"
    auto-grow
    hide-details
  />
</template>
