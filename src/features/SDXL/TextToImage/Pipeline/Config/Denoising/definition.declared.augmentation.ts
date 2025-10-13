import {
  SDXL_TextToImage_Pipeline_Config_Denoising_InputAdherenceFactor,
} from './InputAdherenceFactor';

import {
  SDXL_TextToImage_Pipeline_Config_Denoising_SliceCount,
} from './SliceCount';

import {
  SDXL_TextToImage_Pipeline_Config_Denoising,
} from './definition.declared.ts';

SDXL_TextToImage_Pipeline_Config_Denoising.SliceCount /*     */ = SDXL_TextToImage_Pipeline_Config_Denoising_SliceCount;
SDXL_TextToImage_Pipeline_Config_Denoising.InputAdherenceFactor = SDXL_TextToImage_Pipeline_Config_Denoising_InputAdherenceFactor;

declare module './definition.declared.ts' {
  namespace SDXL_TextToImage_Pipeline_Config_Denoising {
    export {
      SDXL_TextToImage_Pipeline_Config_Denoising_SliceCount /*     */ as SliceCount,
      SDXL_TextToImage_Pipeline_Config_Denoising_InputAdherenceFactor as InputAdherenceFactor,
    };
  }
}
