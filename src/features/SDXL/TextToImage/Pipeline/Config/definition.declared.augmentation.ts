import type {
  SDXL_TextToImage_Pipeline_Config_Denoising,
} from './Denoising';

declare module './definition.declared.ts' {
  namespace SDXL_TextToImage_Pipeline_Config {
    export type {
      /**/ SDXL_TextToImage_Pipeline_Config_Denoising as Denoising,
    };
  }
}
