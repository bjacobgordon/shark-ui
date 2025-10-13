import {
  SDXL_TextToImage_Pipeline_Config_Denoising,
} from './Denoising';

import type {
  SDXL_TextToImage_Pipeline_Config_Postprocessing,
} from './Postprocessing';

import type {
  SDXL_TextToImage_Pipeline_Config_Preprocessing,
} from './Preprocessing';

import {
  SDXL_TextToImage_Pipeline_Config,
} from './definition.declared.ts';

SDXL_TextToImage_Pipeline_Config.Denoising = SDXL_TextToImage_Pipeline_Config_Denoising;

declare module './definition.declared.ts' {
  namespace SDXL_TextToImage_Pipeline_Config {
    export {
      type SDXL_TextToImage_Pipeline_Config_Preprocessing /* */ as Preprocessing,
      /**/ SDXL_TextToImage_Pipeline_Config_Denoising /*     */ as Denoising,
      type SDXL_TextToImage_Pipeline_Config_Postprocessing /**/ as Postprocessing,
    };
  }
}
