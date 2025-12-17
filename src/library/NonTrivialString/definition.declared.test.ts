import {
  describe,
  it,
} from 'vitest';

import {
  NonTrivialString,
} from './definition.declared.ts';

describe(NonTrivialString, () => {
  describe('instantiation', () => {
    describe('the sad outcomes', () => {
      it.todo('should reject an empty string');

      it.todo('should reject a whitespace character');
    });

    describe('the happy outcomes', () => {
      it.todo('should accept a non-whitespace character');

      it.todo('should accept a padded non-whitespace character');

      it.todo('should accept a string of multiple non-whitespace characters');

      it.todo('should accept a padded string of multiple non-whitespace characters');
    });
  });

  // TODO: state whether instances should resemble some other primitive type or object
  // e.g. "branded string should still be a string rather than a wrapper object"
  describe.todo('structural compatibility');

  // TODO: state whether instances should be mutable and, if so, specify in what ways
  describe.todo('mutability');
});
