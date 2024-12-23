import {promises as fs} from 'fs';
import {OpenAPIV3} from 'openapi-types';
import path from 'path';

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

        // Prepare lines for "api.ts" output
        const lines: string[] = [];
        lines.push('// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n');

        // Utility to create valid variable names
        function sanitize(name: string): string {
            // Replace all non-alphanumeric/underscore characters with an underscore
            return name.replace(/[^\w]/g, '_');
        }

        // Iterate over each path and method
        if (openApiSpec.paths) {
            for (const [pathName, pathItem] of Object.entries(
                openApiSpec.paths
            )) {
                if (!pathItem) {
                    continue;
                } // In case a path is undefined

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
                    // Each of these corresponds to an OpenAPI operation
                    const operation = pathItem[method];
                    if (operation) {
                        // Create a variable name based on method and path
                        const varName = sanitize(`API_${method}_${pathName}`);
                        // Use the operation description if available, else a fallback
                        const description =
                            operation.description || 'No description provided';
                        // Escape double quotes in the description
                        const escapedDescription = description.replace(
                            /"/g,
                            '\\"'
                        );

                        // Create a line exporting the variable
                        lines.push(
                            `export const ${varName} = "${escapedDescription}";`
                        );
                    }
                }
            }
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
