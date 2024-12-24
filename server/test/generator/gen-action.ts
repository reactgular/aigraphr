import {OpenAPIV3} from 'openapi-types';
import {toCamelCase} from 'remeda';
import {Descriptor} from './gen-descriptors';
import {genStatus} from './gen-status';

export async function* genAction(desc: Descriptor) {
    function isParameterObject(
        p: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject
    ): p is OpenAPIV3.ParameterObject {
        return (p as OpenAPIV3.ParameterObject).in !== undefined;
    }

    function isIn(location: 'path' | 'query') {
        return (p: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject) =>
            isParameterObject(p) && p.in === location;
    }

    const name = toCamelCase(desc.action);

    const hasPath = desc.operation.parameters?.some(isIn('path'));
    const hasQuery = desc.operation.parameters?.some(isIn('query'));
    const hasBody = Boolean(desc.operation.requestBody);

    const isBodyRequired =
        ((desc.operation.requestBody as OpenAPIV3.RequestBodyObject)
            ?.required ?? false)
            ? ''
            : '?';

    const params: string[] = [];
    const request: string[] = [];

    if (hasPath) {
        params.push(`path: ${desc.data}['path']`);
        request.push('path');
    }

    if (hasBody) {
        params.push(`body${isBodyRequired}: ${desc.data}['body']`);
        request.push('body');
    }

    if (hasQuery) {
        params.push(`query?: ${desc.data}['query']`);
        request.push('query');
    }

    yield `/**`;
    yield `  * ${desc.path}`;
    yield ` */`;
    yield `function ${name}(${params.join(',')}) {`;
    yield `  const promise = ${desc.fetcher}({${request.join(',')}});`;
    yield* genStatus(desc);
    yield '}';
}
