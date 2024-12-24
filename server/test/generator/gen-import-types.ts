import {Descriptor} from './gen-descriptors';

export async function* genImportTypes(descriptors: Descriptor[]) {
    const types = new Set<string>();

    for (const desc of descriptors) {
        types.add(desc.data);
        if (desc.responses) {
            types.add(desc.responses);
        }
        if (desc.errors) {
            types.add(desc.errors);
        }
    }

    yield `import {${Array.from(types)
        .sort()
        .join(',')}} from '@shared/api/types.gen';`;
}
