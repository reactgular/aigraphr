import {Descriptor} from './gen-descriptors';

export async function* genImportTypes(descriptors: Descriptor[]) {
    const types = new Set<string>();
    for (const desc of descriptors) {
        types.add(desc.data);
    }

    yield `import {${Array.from(types).join(
        ','
    )}} from '@shared/api/types.gen';`;
}
