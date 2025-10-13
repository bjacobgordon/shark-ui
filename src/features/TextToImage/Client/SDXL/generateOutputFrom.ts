import {
  HttpClientError,
} from '@effect/platform';

import {
  Effect,
} from 'effect';

import type {
  GenerateFromTextRequest,
} from 'stabilityai-client-typescript/models/operations';

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

type SDXL_TextToImage_Pipeline_Config_Preprocessing = TextToImage_Pipeline.Config.Preprocessing;

type SDXL_TextToImage_Pipeline_Config_Denoising = TextToImage_Pipeline.Config.Denoising;

type SDXL_TextToImage_Pipeline_Config_Postprocessing = TextToImage_Pipeline.Config.Postprocessing;

type SDXL_TextToImage_Pipeline_Config = TextToImage_Pipeline.Config<
  SDXL_TextToImage_Pipeline_Config_Preprocessing,
  SDXL_TextToImage_Pipeline_Config_Denoising,
  SDXL_TextToImage_Pipeline_Config_Postprocessing
>;

const TextToImage_Client_SDXL_generateOutputFrom = (
  given: {
    config?: SDXL_TextToImage_Pipeline_Config;
    textToImageRequestBody: Pick<GenerateFromTextRequest['textToImageRequestBody'],
    | 'textPrompts'
    | 'height'
    | 'width'
    | 'steps'
    | 'cfgScale'
    | 'seed'
    >;
  },
): TextToImage_Client_Generation.Effect => Effect.gen(function* () {
  const shimmedStabilityAIClient = yield* TextToImage_Client_SDXL_initialize;

  const promisedTextToImageResponse = shimmedStabilityAIClient.version1.image.forciblyGenerateFromText({
    engineId              : 'stable-diffusion-xl-1024-v1-0',
    textToImageRequestBody: {
      textPrompts: given.textToImageRequestBody.textPrompts,
      height     : given.textToImageRequestBody.height,
      width      : given.textToImageRequestBody.width,
      seed       : given.textToImageRequestBody.seed,
      steps      : given.textToImageRequestBody.steps,
      cfgScale   : given.textToImageRequestBody.cfgScale,
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
    inferredFrom: given.textToImageRequestBody.textPrompts,
  }).pipe(Effect.orDie);

  return soleTextToImageOutput;
});

export {
  TextToImage_Client_SDXL_generateOutputFrom,
};
