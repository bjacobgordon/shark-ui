import Attempt from '@/library/Attempt';

import type TextToImage from '@/features/TextToImage';

type SDXL_TextToImage_Pipeline_Config_Denoising = TextToImage.Pipeline.Config.Denoising;

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
