import {toCamelCase} from 'remeda';
import {genAction} from './gen-action';
import {Descriptor} from './gen-descriptors';
import {genImportSdk} from './gen-import-sdk';
import {genImportTypes} from './gen-import-types';
import {OpenApiSpec} from './open-api-spec';

export async function* genOutputFile(
    spec: OpenApiSpec,
    controller: string,
    descriptors: Descriptor[]
): AsyncGenerator<string> {
    const name = toCamelCase(controller);

    yield '// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.';
    yield* genImportSdk(spec, descriptors);
    yield* genImportTypes(spec, descriptors);
    yield "import {assertEntity} from '../generator/assert-entity';";
    yield "import {assertObject} from '../generator/assert-object';";
    yield '';
    yield `export function ${name}() {`;
    for (const descriptor of descriptors) {
        yield* genAction(spec, descriptor);
        yield '';
    }
    yield `return {${descriptors
        .map((d) => toCamelCase(d.action))
        .join(', ')}};`;
    yield '}';
}
