<script setup lang="ts">
import {
  get,
  ref,
  set,
  type Ref,
  watch,
} from '@/library/vue';

import {
  Option,
} from 'effect';

import {
  isEmptyArray,
} from 'effect/Array';

import {
  VCard,
} from 'vuetify/components/VCard';

import NonTrivialString from '@/library/NonTrivialString';

import DynamicTextarea from '@/components/DynamicTextarea.vue';

import type {
  TextToImage_Pipeline,
} from '../Pipeline';

type StandardizedInputText = TextToImage_Pipeline.Input['text'];

const exposedInputText = defineModel<Option.Option<StandardizedInputText>>({
  required: true,
});

interface InputTextFieldProps {
  label: string;
  initial: string;
  placeholder: string;
}

defineProps<{
  label: string;
  positive: InputTextFieldProps;
  negative: InputTextFieldProps;
}>();

const qualitativeToQuantitativeTextWeightMap = {
  positive: 1,
  negative: -1,
} as const;

type QualitativeToQuantitativeTextWeightMap = typeof qualitativeToQuantitativeTextWeightMap;

type QualitativeTextWeight = keyof QualitativeToQuantitativeTextWeightMap;

type InputTextByQualitativeWeight = Record<QualitativeTextWeight, Option.Option<NonTrivialString>>;

const byQualitativeWeight = (givenInputText: StandardizedInputText): InputTextByQualitativeWeight => {
  const entriesForInputTextByQualitativeWeight = Object.entries(qualitativeToQuantitativeTextWeightMap)
    .map((eachWeightMapEntry) => {
      const [
        eachUnsafeQualitativeWeight,
        eachQuantitativeWeight,
      ] = eachWeightMapEntry;

      const eachSerializationByWeight = givenInputText
        .filter(($0) => $0.weight === eachQuantitativeWeight)
        .map(($0) => $0.text.trim())
        .join(', ');

      const eachDerivedEntry = [
        eachUnsafeQualitativeWeight,
        eachSerializationByWeight,
      ] as [
        QualitativeTextWeight,
        string,
      ];

      return eachDerivedEntry;
    });

  const computedInputTextByQualitativeWeight = Object.fromEntries(entriesForInputTextByQualitativeWeight);
  return computedInputTextByQualitativeWeight as unknown as InputTextByQualitativeWeight;
};

const standardized = (givenInputText: InputTextByQualitativeWeight): Option.Option<StandardizedInputText> => Option.gen(function* () {
  const sparseStandardizedInputText = Object.entries(qualitativeToQuantitativeTextWeightMap)
    .map((eachWeightMapEntry): Option.Option<StandardizedInputText[number]> => Option.gen(function* () {
      const [
        eachUnsafeQualitativeWeight,
        eachQuantitativeWeight,
      ] = eachWeightMapEntry;

      const eachQualitativeWeight = eachUnsafeQualitativeWeight as QualitativeTextWeight;
      const weightedText = givenInputText[eachQualitativeWeight];

      const newInputTextComponent = {
        text  : yield* weightedText,
        weight: eachQuantitativeWeight,
      };

      return newInputTextComponent;
    }));

  const standardizedInputText = yield* Option.all(sparseStandardizedInputText);

  if (
    isEmptyArray(standardizedInputText)
  ) return yield* Option.none();

  return standardizedInputText;
});

const emptyInitialInputText: InputTextByQualitativeWeight = {
  positive: Option.none(),
  negative: Option.none(),
};

const initialInputText: InputTextByQualitativeWeight = Option.match(get(exposedInputText), {
  onSome: ($0) => byQualitativeWeight($0),
  onNone: () => emptyInitialInputText,
});

const currentInputText: Ref<InputTextByQualitativeWeight> = ref(initialInputText);

watch(
  currentInputText,
  (updatedInputText) => {
    const wrappedInputText = standardized(updatedInputText);
    set(exposedInputText, wrappedInputText);
  },
  {
    deep     : true,
    immediate: true,
  },
);
</script>

<template>
  <VCard
    :subtitle="label"
  >
    <template #text>
      <DynamicTextarea
        v-model="currentInputText.positive"
        :initial="positive.initial"
        :label="positive.label"
        :placeholder="positive.placeholder"
        required
      />

      <br>

      <DynamicTextarea
        v-model="currentInputText.negative"
        :initial="negative.initial"
        :label="negative.label"
        :placeholder="negative.placeholder"
      />
    </template>
  </VCard>
</template>
