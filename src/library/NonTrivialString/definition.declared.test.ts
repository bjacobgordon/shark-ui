import {
  describe,
} from 'vitest';

import {
  NonTrivialString,
} from './definition.declared.ts';

describe(NonTrivialString, () => {
  describe('instantiation', () => {
    describe.todo('the sad outcomes');

    describe.todo('the happy outcomes');
  });

  // TODO: state whether instances should resemble some other primitive type or object
  // e.g. "branded string should still be a string rather than a wrapper object"
  describe.todo('structural compatibility');

  // TODO: state whether instances should be mutable and, if so, specify in what ways
  describe.todo('mutability');
});
