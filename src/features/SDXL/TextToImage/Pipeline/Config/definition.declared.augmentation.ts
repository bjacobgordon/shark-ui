import {
  SDXL_TextToImage_Pipeline_Config_Denoising,
} from './Denoising';

import {
  SDXL_TextToImage_Pipeline_Config,
} from './definition.declared.ts';

SDXL_TextToImage_Pipeline_Config.Denoising = SDXL_TextToImage_Pipeline_Config_Denoising;

declare module './definition.declared.ts' {
  namespace SDXL_TextToImage_Pipeline_Config {
    export {
      /**/ SDXL_TextToImage_Pipeline_Config_Denoising as Denoising,
    };
  }
}
