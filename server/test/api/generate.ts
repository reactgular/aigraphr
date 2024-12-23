import {promises as fs} from 'fs';
import {OpenAPIV3} from 'openapi-types';
import path from 'path';

// Utility to create valid variable names
function sanitize(name: string): string {
    // Replace all non-alphanumeric/underscore characters with an underscore
    return name.replace(/[^\w]/g, '_');
}

async function* genApi(openApiSpec: OpenAPIV3.Document) {
    yield '// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.';
    yield '';

    if (openApiSpec.paths) {
        for (const [pathName, pathItem] of Object.entries(openApiSpec.paths)) {
            console.log(pathName);

            yield `// ${pathName}`;
            if (pathItem) {
                yield* genOperations(pathItem!);
            } else {
                yield '// No operations';
            }
        }
    } else {
        yield '// No paths';
    }
}

async function* genOperations(pathItem: OpenAPIV3.PathItemObject) {
    for (const method of [
        'get',
        'post',
        'put',
        'delete',
        'options',
        'head',
        'patch',
        'trace'
    ] as const) {
        const operation = pathItem[method];
        if (operation) {
            console.log(`  ${method} ${operation.operationId}`);
            yield* genOperation(operation);
        }
    }
}

async function* genOperation(operation: OpenAPIV3.OperationObject) {
    if (!operation.operationId) {
        throw new Error('OperationId is required');
    }
    const varName = sanitize(`API_${operation.operationId}`);
    const description = operation.description || 'No description provided';
    const escapedDescription = description.replace(/"/g, '\\"');
    yield `export const ${varName} = "${escapedDescription}";`;
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
        for await (const line of genApi(openApiSpec)) {
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
