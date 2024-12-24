import SwaggerParser from '@apidevtools/swagger-parser';
import {promises as fs} from 'fs';
import {OpenAPIV3} from 'openapi-types';

/**
 * A utility type that recursively removes `ReferenceObject` from T.
 *
 * 1. If T directly extends `ReferenceObject`, it becomes `never`.
 * 2. Otherwise, if T is an object (including arrays), recurse on its properties.
 * 3. Otherwise (string, number, boolean, etc.), just return T as-is.
 */
export type WithoutReference<T> = T extends OpenAPIV3.ReferenceObject
    ? never
    : T extends object
      ? {[K in keyof T]: WithoutReference<T[K]>}
      : T;

export class OpenApiSpec {
    protected constructor(private readonly spec: OpenAPIV3.Document) {}

    public get paths() {
        return Object.entries(this.spec.paths ?? {});
    }

    public static async open(path: string): Promise<OpenApiSpec> {
        const json = await fs.readFile(path, 'utf-8');
        const spec = (await SwaggerParser.dereference(
            JSON.parse(json)
        )) as OpenAPIV3.Document;
        if (spec.openapi !== '3.0.0') {
            throw new Error('Only OpenAPI 3.0.0 is supported');
        }
        return new OpenApiSpec(spec);
    }

    public static toSchemaObject(
        schema?: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
    ): OpenAPIV3.SchemaObject | undefined {
        if (schema && 'type' in schema) {
            return schema as OpenAPIV3.SchemaObject;
        }
        return undefined;
    }
}
