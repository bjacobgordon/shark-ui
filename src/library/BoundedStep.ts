import Attempt from '@/library/Attempt';
import type Range from '@/library/Range';

const runtimePrivateToken = Symbol('Private');

class BoundedStep {
  public static range: Range.Discrete | null = null;

  protected constructor(
    private readonly step: number,
    token: symbol | undefined = undefined,
  ) {
    if (
      token !== runtimePrivateToken
    ) return Attempt.Outcome.die(`The constructor for ${new.target.name} is private. Use a factory method instead.`);
  }

  protected static inclusivelyBound(
    givenStep: number,
  ): BoundedStep {
    if (
      this.range === null
    ) return Attempt.Outcome.die(`Must override \`range\` in ${this.name}`);
    else if (
      !this.range.inclusivelyContains(givenStep)
    ) return Attempt.Outcome.die(`Given point ${givenStep.toString()} doesn't fall within range ${this.range.inInclusiveNotation}`);

    return new this(givenStep, runtimePrivateToken);
  }

  public get asNumber(): number {
    return this.step;
  }
}

export {
  BoundedStep as default,
};
