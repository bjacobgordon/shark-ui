import type {
  TextToImage_Pipeline_Config_Denoising,
} from './Denoising';

import type {
  TextToImage_Pipeline_Config_Postprocessing,
} from './Postprocessing';

import type {
  TextToImage_Pipeline_Config_Preprocessing,
} from './Preprocessing';

declare module './definition.declared.ts' {
  namespace TextToImage_Pipeline_Config {
    export {
      type TextToImage_Pipeline_Config_Preprocessing /* */ as Preprocessing,
      type TextToImage_Pipeline_Config_Denoising /*     */ as Denoising,
      type TextToImage_Pipeline_Config_Postprocessing /**/ as Postprocessing,
    };
  }
}
