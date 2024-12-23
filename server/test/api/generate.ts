import {promises as fs} from 'fs';
import {OpenAPIV3} from 'openapi-types';
import path from 'path';

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
        // Convert the provided path to an absolute path
        const absolutePath = path.resolve(filePath);

        // Read and parse the JSON file
        const json = await fs.readFile(absolutePath, 'utf-8');
        const openApiSpec: OpenAPIV3.Document = JSON.parse(json);

        // Do whatever you need with the parsed OpenAPI spec
        console.log(openApiSpec);
    } catch (error) {
        console.error(`Failed to read or parse file at ${filePath}:`, error);
        process.exit(1);
    }
};

generator();
