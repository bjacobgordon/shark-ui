import Attempt from '@/library/Attempt';

import type {
  SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise_Id,
} from './Id';

interface SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise {
  id: SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise_Id;
}

function SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise(
  namespaceOnly: never = Attempt.Outcome.die(
    `Unexpected call of module augmentation provision for "${SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise.name}".`,
  ),
): never {
  return namespaceOnly;
}

export type {
  SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise,
};
