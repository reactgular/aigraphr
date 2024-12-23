import {OpenAPIV3} from 'openapi-types';
import {toCamelCase} from 'remeda';
import {genControllers} from './gen-controllers';

export async function* genOutputIndex(
    openApiSpec: OpenAPIV3.Document
): AsyncGenerator<string> {
    yield '// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.';

    const names: string[] = [];
    for await (const [controller] of genControllers(openApiSpec)) {
        const name = toCamelCase(controller);
        yield `import {${name}} from './${name}';`;
        names.push(name);
    }

    yield '';
    yield `export const apis = {${names.join(', ')}};`;
}
