import {promises as fs} from 'fs';
import {OpenAPIV3} from 'openapi-types';
import path from 'path';

const methods: Array<OpenAPIV3.HttpMethods> = [
    OpenAPIV3.HttpMethods.GET,
    OpenAPIV3.HttpMethods.POST,
    OpenAPIV3.HttpMethods.PUT,
    OpenAPIV3.HttpMethods.DELETE,
    OpenAPIV3.HttpMethods.PATCH,
    OpenAPIV3.HttpMethods.HEAD,
    OpenAPIV3.HttpMethods.OPTIONS,
    OpenAPIV3.HttpMethods.TRACE
];

const generator = async () => {
    // Ensure a file path argument is provided
    if (process.argv.length < 3) {
        console.error(
            'Missing file path argument.\nUsage: ts-node generate.ts [path/to/openapi.json]'
        );
        process.exit(1);
    }

    // Read the file path from command line arguments
    const filePath = process.argv[2];

    try {
        const absolutePath = path.resolve(filePath);
        const json = await fs.readFile(absolutePath, 'utf-8');
        const openApiSpec: OpenAPIV3.Document = JSON.parse(json);

        for (const path of Object.keys(openApiSpec.paths)) {
            const methods = openApiSpec.paths[path];
        }
    } catch (error) {
        console.error(`Failed to read or parse file at ${filePath}:`, error);
        process.exit(1);
    }
};

generator();
