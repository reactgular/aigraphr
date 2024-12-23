import {OpenAPIV3} from 'openapi-types';
import {Descriptor, genDescriptors} from './gen-descriptors';

export async function* genControllers(
    openApiSpec: OpenAPIV3.Document
): AsyncGenerator<[string, Descriptor[]]> {
    const map = new Map<string, Descriptor[]>();
    for await (const desc of genDescriptors(openApiSpec)) {
        const arr = map.get(desc.controller) ?? [];
        arr.push(desc);
        map.set(desc.controller, arr);
    }

    for (const [controller, descriptors] of map) {
        descriptors.sort((a, b) => a.action.localeCompare(b.action));
        yield [controller, descriptors];
    }
}
