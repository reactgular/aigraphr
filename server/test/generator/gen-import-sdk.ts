import {Descriptor} from './gen-descriptors';

export async function* genImportSdk(descriptors: Descriptor[]) {
    const fetchers = new Set<string>();
    for (const desc of descriptors) {
        fetchers.add(desc.fetcher);
    }

    yield `import {${Array.from(fetchers).join(
        ','
    )}} from '@shared/api/sdk.gen';`;
}
