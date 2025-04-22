import {
  HttpClientError,
} from '@effect/platform';

import {
  type Brand,
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

interface SDXL_TextToImage_Pipeline_Config_Preprocessing_Canvas {
  height: 1024;
  width: 1024;
}

type TextToImage_Pipeline_SDXL_Config_NoiseId = Brand.Branded<number, 'TextToImage_Pipeline_SDXL_Config_NoiseId'>; // TODO: refine to whole numbers within a specific range

interface SDXL_TextToImage_Pipeline_Config_InitialNoise {
  id: TextToImage_Pipeline_SDXL_Config_NoiseId;
}

interface SDXL_TextToImage_Pipeline_Config_Preprocessing
  extends TextToImage_Pipeline.Config.Preprocessing {
  /**
   * Describes the dimensions of the output. Constrains:
   * - the aspect ratio to be within with a model's training data
   * - the required scale factors to be within the range of the pipeline's capabilities to upscale from latent space
   */
  canvas: SDXL_TextToImage_Pipeline_Config_Preprocessing_Canvas;
  /**
   * The artifact to be used as the starting point for denoising.
   * This the "soil" containing some "seed" that will grow into a "plant" (output image) as we apply the "fertilizer" (prompts)
   *
   * c.k.a. the "seed", but that's a misnomer; it's more like the "soil" that _contains_ the "seed")
   */
  initialNoise: SDXL_TextToImage_Pipeline_Config_InitialNoise;
}

type SDXL_TextToImage_Pipeline_Config_Denoising_ClassifierFreeGuidanceScale = Brand.Branded<number, 'TextToImage_Pipeline_SDXL_Denoising_ClassifierFreeGuidanceScale'>; // TODO: refine to floating point within some range

interface SDXL_TextToImage_Pipeline_Config_Denoising
  extends TextToImage_Pipeline.Config.Denoising {
  /**
   * How much each final result of reverse diffusion should stray away from the prompt-less pass towards the prompted pass.
   *
   * c.k.a. "classifier-free guidance scale", but we:
   * - exclude "classifier-free" because it's pipeline-speak for "doesn't require a separate model because we do it in the denoising phase"
   * - trade "guidance" for "inputAdherence" to reduce vagueness
   */
  inputAdherenceScale?: SDXL_TextToImage_Pipeline_Config_Denoising_ClassifierFreeGuidanceScale;
}

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
    | 'steps'
    >;
  },
): TextToImage_Client_Generation.Effect => Effect.gen(function* () {
  const shimmedStabilityAIClient = yield* TextToImage_Client_SDXL_initialize;

  const promisedTextToImageResponse = shimmedStabilityAIClient.version1.image.forciblyGenerateFromText({
    engineId              : 'stable-diffusion-xl-1024-v1-0',
    textToImageRequestBody: {
      textPrompts: given.textToImageRequestBody.textPrompts,
      height     : given.config?.preprocessing?.canvas.height,
      width      : given.config?.preprocessing?.canvas.width,
      seed       : given.config?.preprocessing?.initialNoise.id,
      steps      : given.textToImageRequestBody.steps,
      cfgScale   : given.config?.denoising?.inputAdherenceScale,
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
