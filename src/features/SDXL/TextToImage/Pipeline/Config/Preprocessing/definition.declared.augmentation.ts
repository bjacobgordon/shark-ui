import type {
  SDXL_TextToImage_Pipeline_Config_Preprocessing_Canvas,
} from './Canvas';

import {
  SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise,
} from './InitialNoise';

import {
  SDXL_TextToImage_Pipeline_Config_Preprocessing,
} from './definition.declared.ts';

SDXL_TextToImage_Pipeline_Config_Preprocessing.InitialNoise = SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise;

declare module './definition.declared.ts' {
  namespace SDXL_TextToImage_Pipeline_Config_Preprocessing {
    export {
      /**/ SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise as InitialNoise,
      type SDXL_TextToImage_Pipeline_Config_Preprocessing_Canvas /* */ as Canvas,
    };
  }
}
