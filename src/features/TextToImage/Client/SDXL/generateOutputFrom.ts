import {
  HttpClientError,
} from '@effect/platform';

import {
  Effect,
} from 'effect';

import type {
  SDXL,
} from '@/features/SDXL';

import type {
  TextToImage_Pipeline,
} from '../../Pipeline';

import {
  TextToImage_Server,
} from '../../Server';

import type {
  TextToImage_Client_Generation,
} from '../Generation';

import {
  TextToImage_Client_SDXL_initialize,
} from './initialize';

import {
  toSharkUIOutput,
} from './toSharkUIOutput';

const TextToImage_Client_SDXL_generateOutputFrom = (
  given: {
    input: TextToImage_Pipeline.Input;
    config?: SDXL.TextToImage.Pipeline.Config;
  },
): TextToImage_Client_Generation.Effect => Effect.gen(function* () {
  const shimmedStabilityAIClient = yield* TextToImage_Client_SDXL_initialize;

  const promisedTextToImageResponse = shimmedStabilityAIClient.version1.image.forciblyGenerateFromText({
    engineId              : 'stable-diffusion-xl-1024-v1-0',
    textToImageRequestBody: {
      textPrompts: given.input.text,
      height     : given.config?.preprocessing?.canvas.height,
      width      : given.config?.preprocessing?.canvas.width,
      seed       : given.config?.preprocessing?.initialNoise.id,
      steps      : given.config?.denoising?.sliceCount?.asNumber,
      cfgScale   : given.config?.denoising?.inputAdherenceFactor,
    },
  });

  const textToImageResponse = yield* Effect.tryPromise(() => promisedTextToImageResponse).pipe(
    Effect.catchAll((someException) => {
      const caughtError = someException.cause;

      if (
        HttpClientError.isHttpClientError(caughtError)
        && (caughtError.reason === 'Transport')
      ) return new TextToImage_Server.Error.FailedToConnect(caughtError);

      return Effect.die(caughtError);
    }),
  );

  const soleTextToImageOutput = yield* toSharkUIOutput.first({
    in          : textToImageResponse,
    inferredFrom: given.input.text,
  }).pipe(Effect.orDie);

  return soleTextToImageOutput;
});

export {
  TextToImage_Client_SDXL_generateOutputFrom,
};
