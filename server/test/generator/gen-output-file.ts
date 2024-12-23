import {toCamelCase} from 'remeda';
import {Descriptor} from './gen-descriptors';

async function* genAction(desc: Descriptor) {
    const name = toCamelCase(desc.action);
    yield `function ${name}() {`;
    yield `    // TODO: implement ${desc.action}`;
    yield '}';
}

export async function* genOutputFile(
    controller: string,
    descriptors: Descriptor[]
): AsyncGenerator<string> {
    const name = toCamelCase(controller);

    yield '// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.';
    yield `export function ${name}() {`;
    for (const descriptor of descriptors) {
        yield* genAction(descriptor);
    }
    yield `return {${descriptors
        .map((d) => toCamelCase(d.action))
        .join(', ')}};`;
    yield '}';
}
