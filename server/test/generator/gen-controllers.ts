import {Descriptor, genDescriptors} from './gen-descriptors';
import {OpenApiSpec} from './open-api-spec';

export async function* genControllers(
    spec: OpenApiSpec
): AsyncGenerator<[string, Descriptor[]]> {
    const map = new Map<string, Descriptor[]>();
    for await (const desc of genDescriptors(spec)) {
        const arr = map.get(desc.controller) ?? [];
        arr.push(desc);
        map.set(desc.controller, arr);
    }

    for (const [controller, descriptors] of map) {
        descriptors.sort((a, b) => a.action.localeCompare(b.action));
        yield [controller, descriptors];
    }
}
