import {OpenAPIV3} from 'openapi-types';
import {toCamelCase} from 'remeda';
import {Descriptor} from './gen-descriptors';

export async function* genAction({path, operation, action, data}: Descriptor) {
    function isParameterObject(
        p: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject
    ): p is OpenAPIV3.ParameterObject {
        return (p as OpenAPIV3.ParameterObject).in !== undefined;
    }

    function isIn(location: 'path' | 'query') {
        return (p: OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject) =>
            isParameterObject(p) && p.in === location;
    }

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
