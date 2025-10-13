import {
  SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise_Id,
} from './Id';

import {
  SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise,
} from './definition.declared.ts';

SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise.Id = SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise_Id;

declare module './definition.declared.ts' {
  namespace SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise {
    export {
      SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise_Id as Id,
    };
  }
}
