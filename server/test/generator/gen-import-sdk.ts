import {Descriptor} from './gen-descriptors';
import {OpenApiSpec} from './open-api-spec';

export async function* genImportSdk(
    spec: OpenApiSpec,
    descriptors: Descriptor[]
) {
    const fetchers = new Set<string>();
    for (const desc of descriptors) {
        fetchers.add(desc.fetcher);
    }

    yield `import {${Array.from(fetchers).join(
        ','
    )}} from '@shared/api/sdk.gen';`;
}
