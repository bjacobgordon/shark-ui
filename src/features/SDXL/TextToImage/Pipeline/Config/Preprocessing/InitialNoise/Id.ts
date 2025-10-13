import {
  Brand,
  Option,
} from 'effect';

type SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise_Id = Brand.Branded<
  number,
  'SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise_Id'
>;

const SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise_Id = Brand.refined<
  SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise_Id
>(
  (someNumber) => {
    const newBrandingError = Brand.error(`// TODO: refine to whole numbers within a specific range: ${someNumber.toString()}`);
    return Option.some(newBrandingError);
  },
);

export {
  SDXL_TextToImage_Pipeline_Config_Preprocessing_InitialNoise_Id,
};
