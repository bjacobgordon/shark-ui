import Attempt from '@/library/Attempt';

import type TextToImage from '@/features/TextToImage';

import type {
  SDXL_TextToImage_Pipeline_Config_Preprocessing_Canvas,
} from './Canvas';

import type {
  SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise,
} from './InitialNoise';

interface SDXL_TextToImage_Pipeline_Config_Preprocessing
  extends TextToImage.Pipeline.Config.Preprocessing {
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
  initialNoise: SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise;
}

function SDXL_TextToImage_Pipeline_Config_Preprocessing(
  namespaceOnly: never = Attempt.Outcome.die(
    `Unexpected call of module augmentation provision for "${SDXL_TextToImage_Pipeline_Config_Preprocessing.name}".`,
  ),
): never {
  return namespaceOnly;
}

export {
  SDXL_TextToImage_Pipeline_Config_Preprocessing,
};
