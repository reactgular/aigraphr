import {toCamelCase} from 'remeda';
import {Descriptor} from './gen-descriptors';

async function* genImportTypes(descriptors: Descriptor[]) {
    const types = new Set<string>();
    for (const desc of descriptors) {
        types.add(desc.data);
    }

    yield `import {${Array.from(types).join(
        ','
    )}} from '@shared/api/types.gen';`;
}

async function* genAction(desc: Descriptor) {
    const name = toCamelCase(desc.action);
    yield `function ${name}(data: ${desc.data}) {`;
    yield `    // TODO: implement ${desc.action}`;
    yield '}';
}

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
