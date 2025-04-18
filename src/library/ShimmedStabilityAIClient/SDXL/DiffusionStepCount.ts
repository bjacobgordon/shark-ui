import {
  Effect,
} from 'effect';

import BoundedStep from '@/library/BoundedStep';
import Range from '@/library/Range';

/**
 * Sourced from the [StabilityAI OpenAPI spec](https://github.com/nod-ai/StabilityAI-client-typescript/blob/HEAD/openapi.json)
 *
 * Defined at "components.schemas.Steps"
 */
abstract class SDXL_DiffusionStepCount extends BoundedStep {
  public static override range = Range.Discrete.spanning({
    from: 10,
    to  : 50,
    by  : 1,
  }).pipe(Effect.runSync);

  public static from(givenCount: number): SDXL_DiffusionStepCount {
    return this.inclusivelyBound(givenCount);
  }
}

export {
  SDXL_DiffusionStepCount,
};
