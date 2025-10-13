import Attempt from '@/library/Attempt';

import type TextToImage from '@/features/TextToImage';

import type {
  SDXL_TextToImage_Pipeline_Config_Denoising,
} from './Denoising';

type SDXL_TextToImage_Pipeline_Config = TextToImage.Pipeline.Config<
  /**/ TextToImage.Pipeline.Config.Preprocessing,
  SDXL_TextToImage_Pipeline_Config_Denoising,
  /**/ TextToImage.Pipeline.Config.Postprocessing
>;

function SDXL_TextToImage_Pipeline_Config(
  namespaceOnly: never = Attempt.Outcome.die(
    `Unexpected call of module augmentation provision for "${SDXL_TextToImage_Pipeline_Config.name}".`,
  ),
): never {
  return namespaceOnly;
}

export type {
  SDXL_TextToImage_Pipeline_Config,
};
