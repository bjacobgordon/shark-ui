import {
  Effect,
} from 'effect';

import {
  isEmptyArray,
} from 'effect/Array';

import {
  isTupleOf,
  isUndefined,
} from 'effect/Predicate';

import {
  Node,
  type ExportSpecifier,
} from 'ts-morph';

import {
  soleElementIn,
} from '../../utilitiesByType/array';

import {
  isTypeOnlyStatement,
} from './isTypeOnlyStatement';

const doesTargetValueConstructor = (
  givenExportSpecifier: ExportSpecifier,
): Effect.Effect<boolean> => Effect.gen(function* () {
  const targetDeclarations = givenExportSpecifier.getLocalTargetDeclarations();

  if (
    isEmptyArray(targetDeclarations)
  ) return yield* Effect.dieMessage('Expected at least one target declaration.');

  if (
    targetDeclarations.some(Node.isClassDeclaration)
  ) return true;

  const maxNumberOfMergeableDeclarations = 2;

  if (
    !isTupleOf(maxNumberOfMergeableDeclarations)(targetDeclarations)
    || !targetDeclarations.some(isTypeOnlyStatement)
  ) return false;

  const targetVariableDeclarations = targetDeclarations.filter(Node.isVariableDeclaration);

  const potentialValueConstructor_declaration = yield* soleElementIn(targetVariableDeclarations).pipe(
    Effect.orDie,
  );

  const potentialValueConstructor_symbol = potentialValueConstructor_declaration.getSymbol();

  if (
    isUndefined(potentialValueConstructor_symbol)
  ) return yield* Effect.dieMessage('Expected target declaration to have a symbol.');

  const potentialValueConstructor_apparentCallSignatures = potentialValueConstructor_declaration
    .getType()
    .getApparentType()
    .getCallSignatures();

  const potentialValueConstructor_soleCallSignature = yield* soleElementIn(potentialValueConstructor_apparentCallSignatures).pipe(
    Effect.orDie,
  );

  const potentialValueConstructor_returnType = potentialValueConstructor_soleCallSignature.getReturnType();

  const potentialValueConstructor_returnSymbol = potentialValueConstructor_returnType.getAliasSymbol() ?? potentialValueConstructor_returnType.getSymbol();

  if (
    isUndefined(potentialValueConstructor_returnSymbol)
  ) return yield* Effect.dieMessage('Expected target declaration to have a return symbol.');

  return (potentialValueConstructor_symbol.getName() === potentialValueConstructor_returnSymbol.getName());
});

export {
  doesTargetValueConstructor,
};
