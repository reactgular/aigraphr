import {toCamelCase, toPascalCase, toSpaces} from '@/strings';
import {promises as fs} from 'fs';
import {OpenAPIV3} from 'openapi-types';
import path from 'path';

interface Operation {
    action: string;

    controller: string;

    data?: string;

    errors?: string;

    fetcher: string;

    path: string;

    responses?: string;
}

async function* genApiFile(openApiSpec: OpenAPIV3.Document) {
    yield '// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.';
    yield* getImports(openApiSpec);
    yield '';
    yield* genConstApi(openApiSpec);
}

async function* getImports(openApiSpec: OpenAPIV3.Document) {
    yield* genSdkImports(openApiSpec);
    yield* genTypesImports(openApiSpec);
    yield "import {builder} from './builder';";
}

async function* genSdkImports(openApiSpec: OpenAPIV3.Document) {
    yield 'import {';
    for await (const operation of genOperations(openApiSpec)) {
        yield ` ${operation.fetcher},`;
    }
    yield "} from '@shared/api/sdk.gen';";
}

async function* genTypesImports(openApiSpec: OpenAPIV3.Document) {
    yield 'import type {';
    for await (const operation of genOperations(openApiSpec)) {
        const imports = [operation.data, operation.responses, operation.errors]
            .filter(Boolean)
            .join(',');
        if (imports) {
            yield ` ${imports},`;
        }
    }
    yield "} from '@shared/api/types.gen';";
}

async function* genConstApi(openApiSpec: OpenAPIV3.Document) {
    yield '/**';
    yield ` * ${openApiSpec.info.title}`;
    yield ` * ${openApiSpec.info.description}`;
    yield ' *';
    yield ` * Version: ${openApiSpec.info.version}`;
    yield ' */';
    yield 'export const api = {';

    for await (const [controller, operations] of genControllers(openApiSpec)) {
        yield ` ${toCamelCase(controller)}: {`;
        for (const operation of operations) {
            yield `  /**`;
            yield `    * ${operation.path}`;
            yield `   */`;
            yield `  ${operation.action}: builder<`;
            yield `    ${operation.data ?? 'never'},`;
            yield `    ${operation.responses ?? 'never'},`;
            yield `    ${operation.errors ?? 'never'}`;
            yield `  >(${operation.fetcher}),`;
        }
        yield ' },';
    }

    yield '};';
}

async function* genControllers(
    openApiSpec: OpenAPIV3.Document
): AsyncGenerator<[string, Operation[]]> {
    const operationsByController = new Map<string, Operation[]>();
    for await (const operation of genOperations(openApiSpec)) {
        const operations =
            operationsByController.get(operation.controller) ?? [];
        operations.push(operation);
        operationsByController.set(operation.controller, operations);
    }
    yield* operationsByController;
}

async function* genOperations(
    openApiSpec: OpenAPIV3.Document
): AsyncGenerator<Operation> {
    if (openApiSpec.paths) {
        for (const [path, pathItem] of Object.entries(openApiSpec.paths)) {
            if (pathItem) {
                for (const method of [
                    OpenAPIV3.HttpMethods.GET,
                    OpenAPIV3.HttpMethods.POST,
                    OpenAPIV3.HttpMethods.PUT,
                    OpenAPIV3.HttpMethods.DELETE,
                    OpenAPIV3.HttpMethods.OPTIONS,
                    OpenAPIV3.HttpMethods.HEAD,
                    OpenAPIV3.HttpMethods.PATCH,
                    OpenAPIV3.HttpMethods.TRACE
                ] as const) {
                    const operation: OpenAPIV3.OperationObject | undefined =
                        pathItem[method];
                    if (operation && operation.operationId) {
                        const [controller, _action] =
                            operation.operationId.split('_');
                        const action = toPascalCase(toSpaces(_action)).replace(
                            / /g,
                            ''
                        );

                        const hasResponses = Object.keys(
                            operation.responses
                        ).some((status) => status.startsWith('2'));

                        const hasErrors = Object.keys(operation.responses).some(
                            (status) =>
                                status.startsWith('3') ||
                                status.startsWith('4') ||
                                status.startsWith('5')
                        );

                        yield {
                            fetcher: `${controller.toLowerCase()}${action}`,
                            data: `${controller}${action}Data`,
                            responses: hasResponses
                                ? `${controller}${action}Responses`
                                : undefined,
                            errors: hasErrors
                                ? `${controller}${action}Errors`
                                : undefined,
                            controller,
                            action: toCamelCase(toSpaces(_action)).replace(
                                / /g,
                                ''
                            ),
                            path
                        };
                    }
                }
            }
        }
    }
}

const generator = async () => {
    // We need at least 4 args: [node, dist/index.js, openapi.json, api.ts]
    if (process.argv.length < 4) {
        console.error(
            'Missing required file path arguments.\n\n' +
                'Usage:\n' +
                '  ts-node generate.ts <path/to/openapi.json> <path/to/api.ts>\n'
        );
        process.exit(1);
    }

    // Read the file paths from command line arguments
    const openApiFilePath = process.argv[2];
    const apiTsOutputPath = process.argv[3];

    try {
        // Convert the provided paths to absolute paths
        const absoluteOpenApiPath = path.resolve(openApiFilePath);
        const absoluteApiTsPath = path.resolve(apiTsOutputPath);

        // Read and parse the JSON file
        const json = await fs.readFile(absoluteOpenApiPath, 'utf-8');
        const openApiSpec: OpenAPIV3.Document = JSON.parse(json);

        // Generate the API file content
        const lines: string[] = [];
        for await (const line of genApiFile(openApiSpec)) {
            lines.push(line);
        }

        // Write all lines to the specified "api.ts" file
        await fs.writeFile(absoluteApiTsPath, lines.join('\n'), 'utf-8');
        console.log(`File written to ${absoluteApiTsPath}`);
    } catch (error) {
        console.error(`Failed to read/write file:\n`, error);
        process.exit(1);
    }
};

generator().catch(console.error);
