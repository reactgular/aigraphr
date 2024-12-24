import {toCamelCase} from 'remeda';
import {genAction} from './gen-action';
import {Descriptor} from './gen-descriptors';
import {genImportTypes} from './gen-import-types';

export async function* genOutputFile(
    controller: string,
    descriptors: Descriptor[]
): AsyncGenerator<string> {
    const name = toCamelCase(controller);

    yield '// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.';
    yield* genImportTypes(descriptors);
    yield '';
    yield `export function ${name}() {`;
    for (const descriptor of descriptors) {
        yield* genAction(descriptor);
        yield '';
    }
    yield `return {${descriptors
        .map((d) => toCamelCase(d.action))
        .join(', ')}};`;
    yield '}';
}
