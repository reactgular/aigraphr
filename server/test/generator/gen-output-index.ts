import {toCamelCase} from 'remeda';
import {genControllers} from './gen-controllers';
import {OpenApiSpec} from './open-api-spec';

export async function* genOutputIndex(
    spec: OpenApiSpec
): AsyncGenerator<string> {
    yield '// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.';

    const names: string[] = [];
    for await (const [controller] of genControllers(spec)) {
        names.push(toCamelCase(controller));
    }
    names.sort();

    for (const name of names) {
        yield `import {${name}} from './${name}';`;
    }
    yield '';
    yield `export const apis = {${names.join(', ')}};`;
}
