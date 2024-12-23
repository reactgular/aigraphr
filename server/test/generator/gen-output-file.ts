import {toCamelCase} from 'remeda';
import {Descriptor} from './gen-descriptors';

export async function* genOutputFile(
    controller: string,
    descriptors: Descriptor[]
): AsyncGenerator<string> {
    const name = toCamelCase(controller);

    yield '// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.';
    yield `function ${name}() {`;
    yield '}';
    yield '';
    yield `export {${name}};`;
}
