import Attempt from '@/library/Attempt';

import type {
  TextToImage_Pipeline_Config_Denoising,
} from './Denoising';

import type {
  TextToImage_Pipeline_Config_Postprocessing,
} from './Postprocessing';

import type {
  TextToImage_Pipeline_Config_Preprocessing,
} from './Preprocessing';

interface TextToImage_Pipeline_Config<
  SomePhaseForPreprocessing /* */ extends TextToImage_Pipeline_Config_Preprocessing /* */| undefined,
  SomePhaseForDenoising /*     */ extends TextToImage_Pipeline_Config_Denoising /*     */| undefined,
  SomePhaseForPostprocessing /**/ extends TextToImage_Pipeline_Config_Postprocessing /**/| undefined,
> {
  preprocessing?: SomePhaseForPreprocessing;
  denoising?: SomePhaseForDenoising;
  postprocessing?: SomePhaseForPostprocessing;
}

function TextToImage_Pipeline_Config(
  namespaceOnly: never = Attempt.Outcome.die(
    `Unexpected call of module augmentation provision for "${TextToImage_Pipeline_Config.name}".`,
  ),
): never {
  return namespaceOnly;
}

export type {
  TextToImage_Pipeline_Config,
};
