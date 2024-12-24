import {OpenAPIV3} from 'openapi-types';
import {Descriptor} from './gen-descriptors';

function isResponseObject(obj: unknown): obj is OpenAPIV3.ResponseObject {
    return typeof obj === 'object' && obj !== null && 'description' in obj;
}

export async function* genStatus(desc: Descriptor) {
    if (!desc.responses) {
        return;
    }

    const results: string[] = ['promise'];
    for (const [code, resp] of Object.entries(desc.operation.responses)) {
        if (!isResponseObject(resp)) {
            continue;
        }

        yield `/**`;
        yield ` * ${resp.description}`;
        yield ` */`;
        yield `function is${code}() {`;
        yield `const asserts = assetEntity<${desc.responses}[${code}],ReturnType<typeof ${desc.fetcher}>>(promise);`;
        yield `  return {...promise, ...asserts};`;
        yield `}`;

        results.push(`is${code}`);
    }
    yield '';
    yield `return {...${results.join(',')}};`;
}
