import Attempt from '@/library/Attempt';

import type TextToImage from '@/features/TextToImage';

import type {
  SDXL_TextToImage_Pipeline_Config_Denoising,
} from './Denoising';

import type {
  SDXL_TextToImage_Pipeline_Config_Postprocessing,
} from './Postprocessing';

import type {
  SDXL_TextToImage_Pipeline_Config_Preprocessing,
} from './Preprocessing';

type SDXL_TextToImage_Pipeline_Config = TextToImage.Pipeline.Config<
  SDXL_TextToImage_Pipeline_Config_Preprocessing,
  SDXL_TextToImage_Pipeline_Config_Denoising,
  SDXL_TextToImage_Pipeline_Config_Postprocessing
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
