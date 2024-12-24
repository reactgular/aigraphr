import {OpenAPIV3} from 'openapi-types';
import {OpenApiSpec} from './open-api-spec';

const methods = [
    OpenAPIV3.HttpMethods.GET,
    OpenAPIV3.HttpMethods.POST,
    OpenAPIV3.HttpMethods.PUT,
    OpenAPIV3.HttpMethods.DELETE,
    OpenAPIV3.HttpMethods.OPTIONS,
    OpenAPIV3.HttpMethods.HEAD,
    OpenAPIV3.HttpMethods.PATCH,
    OpenAPIV3.HttpMethods.TRACE
] as const;

export type OperationWithId = Omit<OpenAPIV3.OperationObject, 'operationId'> & {
    operationId: string;
};

export async function* genOperations(
    spec: OpenApiSpec
): AsyncGenerator<[string, OperationWithId]> {
    for (const [path, pathItem] of spec.paths) {
        for (const method of methods) {
            const operation: OpenAPIV3.OperationObject | undefined =
                pathItem?.[method];
            if (operation) {
                if (operation.operationId) {
                    yield [path, operation as OperationWithId];
                } else {
                    throw new Error(
                        `Operation ID missing for path: ${path} and method: ${method}`
                    );
                }
            }
        }
    }
}
