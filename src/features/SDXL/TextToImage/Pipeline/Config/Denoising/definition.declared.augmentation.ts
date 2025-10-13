import {
  SDXL_TextToImage_Pipeline_Config_Denoising_SliceCount,
} from './SliceCount';

import {
  SDXL_TextToImage_Pipeline_Config_Denoising,
} from './definition.declared.ts';

SDXL_TextToImage_Pipeline_Config_Denoising.SliceCount = SDXL_TextToImage_Pipeline_Config_Denoising_SliceCount;

declare module './definition.declared.ts' {
  namespace SDXL_TextToImage_Pipeline_Config_Denoising {
    export {
      SDXL_TextToImage_Pipeline_Config_Denoising_SliceCount as SliceCount,
    };
  }
}
