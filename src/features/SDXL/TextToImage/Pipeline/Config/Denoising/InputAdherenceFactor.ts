import {
  Brand,
  Option,
} from 'effect';

/**
 * c.k.a "[classifier-free guidance scale](https://en.wikipedia.org/wiki/Diffusion_model#Classifier-free_guidance_(CFG))"
 */
type SDXL_TextToImage_Pipeline_Config_Denoising_InputAdherenceFactor = Brand.Branded<
  number,
  'SDXL_TextToImage_Pipeline_Config_Denoising_InputAdherenceFactor'
>;

const SDXL_TextToImage_Pipeline_Config_Denoising_InputAdherenceFactor = Brand.refined<
  SDXL_TextToImage_Pipeline_Config_Denoising_InputAdherenceFactor
>(
  (someNumber) => {
    const newBrandingError = Brand.error(`// TODO: refine to unsigned floating point within some range: ${someNumber.toString()}`);
    return Option.some(newBrandingError);
  },
);

export {
  SDXL_TextToImage_Pipeline_Config_Denoising_InputAdherenceFactor,
};
