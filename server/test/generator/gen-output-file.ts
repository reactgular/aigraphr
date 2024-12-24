import {OpenAPIV3} from 'openapi-types';
import {toCamelCase} from 'remeda';
import {Descriptor} from './gen-descriptors';

function isParameterObject(
    p: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject
): p is OpenAPIV3.ParameterObject {
    return (p as OpenAPIV3.ParameterObject).in !== undefined;
}

function isIn(location: 'path' | 'query') {
    return (p: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject) =>
        isParameterObject(p) && p.in === location;
}

async function* genImportTypes(descriptors: Descriptor[]) {
    const types = new Set<string>();
    for (const desc of descriptors) {
        types.add(desc.data);
    }

    yield `import {${Array.from(types).join(
        ','
    )}} from '@shared/api/types.gen';`;
}

async function* genAction({path, operation, action, data}: Descriptor) {
    const name = toCamelCase(action);

    const hasPath = operation.parameters?.some(isIn('path'));
    const hasQuery = operation.parameters?.some(isIn('query'));
    const hasBody = Boolean(operation.requestBody);

    const isBodyRequired =
        ((operation.requestBody as OpenAPIV3.RequestBodyObject)?.required ??
        false)
            ? ''
            : '?';

    const params: string[] = [];

    if (hasPath) {
        params.push(`path: ${data}['path']`);
    }

    if (hasBody) {
        params.push(`body${isBodyRequired}: ${data}['body']`);
    }

    if (hasQuery) {
        params.push(`query?: ${data}['query']`);
    }

    yield `/**`;
    yield `  * ${path}`;
    yield ` */`;
    yield `function ${name}(${params.join(',')}) {`;
    yield `    // TODO: implement ${action}`;
    yield '}';
}

export async function* genOutputFile(
    controller: string,
    descriptors: Descriptor[]
): AsyncGenerator<string> {
    const name = toCamelCase(controller);

    yield '// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.';
    yield* genImportTypes(descriptors);
    yield '';
    yield `export function ${name}() {`;
    for (const descriptor of descriptors) {
        yield* genAction(descriptor);
        yield '';
    }
    yield `return {${descriptors
        .map((d) => toCamelCase(d.action))
        .join(', ')}};`;
    yield '}';
}
