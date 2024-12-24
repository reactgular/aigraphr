import {OpenAPIV3} from 'openapi-types';
import {Descriptor} from './gen-descriptors';
import {OpenApiSpec} from './open-api-spec';

function isResponseObject(obj: unknown): obj is OpenAPIV3.ResponseObject {
    return typeof obj === 'object' && obj !== null && 'description' in obj;
}

export async function* genStatus(spec: OpenApiSpec, desc: Descriptor) {
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

        const schema = OpenApiSpec.toSchemaObject(
            resp.content?.['application/json']?.schema
        );

        function* assert(name: string, assert: string) {
            yield `const ${name} = ${assert}<${isResponse ? desc.responses : desc.errors}[${code}],ReturnType<typeof ${desc.fetcher}>>(promise);`;
            variables.push(name);
        }

        if (schema) {
            if (schema.type == 'object') {
                yield* assert('objects', 'assertObject');
            }
        }

        yield `  return {${variables.map((v) => `...${v}`).join(',')}};`;
        yield `}`;

        results.push(`is${code}`);
    }
    yield '';
    yield `return {...${results.join(',')}};`;
}
