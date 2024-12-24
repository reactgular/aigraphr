import {toPascalCase, toSpaces} from '@/strings';
import {OpenAPIV3} from 'openapi-types';
import {genOperations, OperationWithId} from './gen-operations';

export interface Descriptor {
    action: string;

    controller: string;

    data: string;

    errors?: string;

    fetcher: string;

    operation: OperationWithId;

    path: string;

    responses?: string;
}

export async function* genDescriptors(
    openApiSpec: OpenAPIV3.Document
): AsyncGenerator<Descriptor> {
    for await (const [path, operation] of genOperations(openApiSpec)) {
        const [controller, _action] = operation.operationId!.split('_');

        const action = toPascalCase(toSpaces(_action)).replace(/ /g, '');

        const hasResponses = Object.keys(operation.responses).some((status) =>
            status.startsWith('2')
        );

        const hasErrors = Object.keys(operation.responses).some(
            (status) =>
                status.startsWith('3') ||
                status.startsWith('4') ||
                status.startsWith('5')
        );

        const fetcher = `${controller.toLowerCase()}${action}`;
        const data = `${controller}${action}Data`;
        const responses = hasResponses
            ? `${controller}${action}Responses`
            : undefined;
        const errors = hasErrors ? `${controller}${action}Errors` : undefined;

        yield {
            path,
            operation,
            controller,
            action,
            fetcher,
            data,
            errors,
            responses
        };
    }
}
