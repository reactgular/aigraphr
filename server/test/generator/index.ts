import {toKebabCase, toSpaces} from '@/strings';
import {promises as fs} from 'fs';
import {OpenAPIV3} from 'openapi-types';
import path from 'path';
import {genControllers} from './gen-controllers';
import {genOutputFile} from './gen-output-file';
import {genOutputIndex} from './gen-output-index';

const toString = async (generator: AsyncGenerator<string>): Promise<string> => {
    const lines: string[] = [];
    for await (const line of generator) {
        lines.push(line);
    }
    return lines.join('\n');
};

const generator = async () => {
    if (process.argv.length < 4) {
        console.error(
            'Missing required file path arguments.\n\n' +
                'Usage:\n' +
                '  ts-node test/generator/index.ts [path/to/openapi.json] [path/to/apis]\n'
        );
        process.exit(1);
    }

    const openApiFilePath = process.argv[2];
    const outputPath = process.argv[3];

    try {
        const json = await fs.readFile(openApiFilePath, 'utf-8');
        const openApiSpec: OpenAPIV3.Document = JSON.parse(json);

        for await (const [controller, descriptors] of genControllers(
            openApiSpec
        )) {
            const fileName = `${toKebabCase(toSpaces(controller))}.ts`;
            const output = path.join(outputPath, fileName);

            console.log(`Generating ${output}`);

            await fs.writeFile(
                output,
                await toString(genOutputFile(controller, descriptors)),
                'utf-8'
            );
        }

        const indexFile = path.join(outputPath, 'index.ts');
        console.log(`Generating ${indexFile}`);
        await fs.writeFile(
            indexFile,
            await toString(genOutputIndex(openApiSpec)),
            'utf-8'
        );
    } catch (error) {
        console.error(`Failed to read/write file:\n`, error);
        process.exit(1);
    }
};

generator().catch(console.error);
