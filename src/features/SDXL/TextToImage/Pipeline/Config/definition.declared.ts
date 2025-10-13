import type TextToImage from '@/features/TextToImage';

type SDXL_TextToImage_Pipeline_Config = TextToImage.Pipeline.Config<
  /**/ TextToImage.Pipeline.Config.Preprocessing,
  /**/ TextToImage.Pipeline.Config.Denoising,
  /**/ TextToImage.Pipeline.Config.Postprocessing
>;

export type {
  SDXL_TextToImage_Pipeline_Config,
};
