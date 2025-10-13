import Attempt from '@/library/Attempt';

import type TextToImage from '@/features/TextToImage';

import type {
  SDXL_TextToImage_Pipeline_Config_Denoising_InputAdherenceFactor,
} from './InputAdherenceFactor';

import type {
  SDXL_TextToImage_Pipeline_Config_Denoising_SliceCount,
} from './SliceCount';

interface SDXL_TextToImage_Pipeline_Config_Denoising
  extends TextToImage.Pipeline.Config.Denoising {
  /**
   * Determines the granularity of each step of reverse diffusion.
   *
   * It's like slices of a pie:
   * - _less_ slices means _bigger_ slices requiring _less_ work but yielding _coarser_ output
   * - _more_ slices means _smaller_ slices requiring _more_ work but yielding _finer_ output.
   *
   * Has a fixed range because, after a certain point, more "slices of the pie" lead to "mush" (weird images)
   *
   * c.k.a. "step count", but this name might imply that increasing the count will continue to improve the output.
   * But in reality, doing so will eventually have adverse effects.
   */
  sliceCount?: SDXL_TextToImage_Pipeline_Config_Denoising_SliceCount;
  /**
   * How much each final result of reverse diffusion should stray away from the prompt-less pass towards the prompted pass.
   *
   * c.k.a. "classifier-free guidance scale", but we:
   * - exclude "classifier-free" because it's pipeline-speak for "doesn't require a separate model because we do it in the denoising phase"
   * - trade "guidance" for "inputAdherence" to reduce vagueness
   * - trade "scale" for "factor" to reduce confusion between "scale factor" and "scale from some lower bound to some upper bound"
   */
  inputAdherenceFactor?: SDXL_TextToImage_Pipeline_Config_Denoising_InputAdherenceFactor;
}

function SDXL_TextToImage_Pipeline_Config_Denoising(
  namespaceOnly: never = Attempt.Outcome.die(
    `Unexpected call of module augmentation provision for "${SDXL_TextToImage_Pipeline_Config_Denoising.name}".`,
  ),
): never {
  return namespaceOnly;
}

export {
  SDXL_TextToImage_Pipeline_Config_Denoising,
};
