import {Descriptor} from './gen-descriptors';

export async function* genOutputFile(
    controller: string,
    descriptors: Descriptor[]
): AsyncGenerator<string> {
    yield '// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.';
    yield `function ${controller}() {`;
    yield '}';
    yield '';
    yield `export {${controller}};`;
}
