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

        const isResponse = code.startsWith('2') || code.startsWith('3');
        const isError = code.startsWith('4') || code.startsWith('5');

        const variables: string[] = ['promise'];

        yield `/**`;
        yield ` * ${resp.description}`;
        yield ` */`;
        yield `function is${code}() {`;

        if (resp.content) {
            /**
             * @deprecated need to reference the schema
             */
            const hasId =
                typeof resp.content['application/json']?.example?.id ===
                'number';

            if (hasId) {
                if (isResponse) {
                    yield `const entity = assetEntity<${desc.responses}[${code}],ReturnType<typeof ${desc.fetcher}>>(promise);`;
                    variables.push('entity');
                } else if (isError) {
                    yield `const entity = assetEntity<${desc.errors}[${code}],ReturnType<typeof ${desc.fetcher}>>(promise);`;
                    variables.push('entity');
                }
            }
        }

        yield `  return {...${variables.join(',')}};`;
        yield `}`;

        results.push(`is${code}`);
    }
    yield '';
    yield `return {...${results.join(',')}};`;
}
