import {
  FileSystem,
  type Path,
} from '@effect/platform';

import {
  Data,
  Effect,
} from 'effect';

import {
  escape,
} from 'effect/RegExp';

import type {
  CodeBlockWriter,
  Project,
  SourceFile,
  WriterFunction,
} from 'ts-morph';

import TypeScript from '../@internal/TypeScript';

import {
  InternalProject,
} from '../TSMorph';

class TestCompanion
  extends Data.Class<{
    readonly unit: TypeScript.File;
  }> {
  private static readonly preExtensionSuffix = '.test';

  private readonly path: Effect.Effect<
    TypeScript.File.Path,
    never,
    Path.Path
  > = Effect.gen(this, function* () {
    const serializedPathToUnit = yield* this.unit.path.serialized;

    const escapedExtension = escape(this.unit.path.ext);
    const capturedExtension = new RegExp(`(${escapedExtension})$`);

    const serializedPathToTestCompanion = serializedPathToUnit.replace(
      capturedExtension,
      TestCompanion.preExtensionSuffix.concat('$1'),
    );

    const pathToTestCompanion = yield* TypeScript.File.Path.parsedFrom(serializedPathToTestCompanion).pipe(
      Effect.orDie,
    );

    return pathToTestCompanion;
  });

  public readonly addTo = (
    givenProject: Project,
  ): Effect.Effect<
    SourceFile,
    Error,
    Path.Path
  > => Effect.gen(this, function* () {
    const /*     */ pathToTestCompanion = yield* this.path;
    const serializedPathToTestCompanion = yield* pathToTestCompanion.serialized;

    const testCompanionSource = yield* Effect.try({
      try  : () => givenProject.createSourceFile(serializedPathToTestCompanion),
      catch: (whateverThatWasThrown) => new Error('Test companion already exists.', {
        cause: whateverThatWasThrown,
      }),
    });

    const keyForTestSuiteImport = 'describe';

    testCompanionSource.addImportDeclaration({
      moduleSpecifier: 'vitest',
      namedImports   : [
        keyForTestSuiteImport,
      ],
    });

    const soleExportFromUnit = yield* this.unit.soleExportUsing(givenProject);
    const soleExportFromUnit_name = soleExportFromUnit.getName();
    const soleExportFromUnit_isValueConstructor = yield* this.unit.soleExportIsValueConstructorUsing(givenProject);

    testCompanionSource.addImportDeclaration({
      moduleSpecifier: `./${this.unit.path.name}`,
      namedImports   : [
        soleExportFromUnit_name,
      ],
    });

    interface TestSuite {
      readonly name: string;
      readonly body?: WriterFunction;
    }

    const writeTestSuiteStatementUsing = (
      givenWriter: CodeBlockWriter,
    ) => (
      givenSuite: TestSuite,
    ): void => {
      const functionArgument = {
        start    : '(',
        delimiter: ',',
        end      : ')',
      };

      givenWriter
        .write(keyForTestSuiteImport)
        .conditionalWrite(givenSuite.body === undefined, '.todo')
        .write(functionArgument.start)
        .quote(givenSuite.name)
        .write(functionArgument.delimiter);

      if (givenSuite.body !== undefined) {
        const writeBodyUsing = givenSuite.body;
        givenWriter.write('() => ').block(() => writeBodyUsing(givenWriter));
      }

      givenWriter
        .write(functionArgument.end)
        .write(';')
        .newLine();
    };

    const writeFunctionalSubSuiteStatementsUsing = (
      givenWriter: CodeBlockWriter,
    ): void => {
      writeTestSuiteStatementUsing(givenWriter)({
        name: 'the sad outcomes',
      });

      writeTestSuiteStatementUsing(givenWriter)({
        name: 'the happy outcomes',
      });
    };

    const writeObjectOrientedSubSuiteStatementsUsing = (
      givenWriter: CodeBlockWriter,
    ): void => {
      writeTestSuiteStatementUsing(givenWriter)({
        name: 'instantiation',
        body: ($0) => writeFunctionalSubSuiteStatementsUsing($0),
      });

      givenWriter.writeLine('// TODO: state whether instances should resemble some other primitive type or object');
      givenWriter.writeLine('// e.g. "branded string should still be a string rather than a wrapper object"');

      writeTestSuiteStatementUsing(givenWriter)({
        name: 'structural compatibility',
      });

      givenWriter.writeLine('// TODO: state whether instances should be mutable and, if so, specify in what ways');

      writeTestSuiteStatementUsing(givenWriter)({
        name: 'mutability',
      });
    };

    const writeTopLevelTestSuiteStatementUsing: WriterFunction = (givenWriter) => writeTestSuiteStatementUsing(givenWriter)({
      name: soleExportFromUnit_name,
      body: ($0) => soleExportFromUnit_isValueConstructor
        ? writeObjectOrientedSubSuiteStatementsUsing($0)
        : /**/writeFunctionalSubSuiteStatementsUsing($0),
    });

    testCompanionSource.addStatements(writeTopLevelTestSuiteStatementUsing);

    return testCompanionSource;
  });

  public readonly write = (): Effect.Effect<
    SourceFile,
    Error,
    Path.Path
  > => Effect.gen(this, function* () {
    const currentProject = new InternalProject();
    const testCompanionSource = yield* this.addTo(currentProject);

    yield* Effect.try(() => currentProject.saveSync());

    return testCompanionSource;
  });

  public readonly doesExist: Effect.Effect<
    boolean,
    Error,
    | Path.Path
    | FileSystem.FileSystem
  > = Effect.gen(this, function* () {
    const /*     */ pathToTestCompanion = yield* this.path;
    const serializedPathToTestCompanion = yield* pathToTestCompanion.serialized;
    const ProvidedFileSystem = yield* FileSystem.FileSystem;
    return yield* ProvidedFileSystem.exists(serializedPathToTestCompanion);
  });

  public static doesExistFor = (
    givenUnit: TypeScript.File,
  ): Effect.Effect<
    boolean,
    Error,
    | Path.Path
    | FileSystem.FileSystem
  > => Effect.gen(this, function* () {
    if (
      !(yield* givenUnit.doesExist)
    ) return yield* Effect.fail(new Error(`Unit does not exist at ${yield* givenUnit.path.serialized}`));

    const expectedTestCompanion = new TestCompanion({
      unit: givenUnit,
    });

    return yield* expectedTestCompanion.doesExist;
  });
}

export {
  TestCompanion,
};
