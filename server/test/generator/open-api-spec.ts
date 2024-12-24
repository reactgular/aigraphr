import {OpenAPIV3} from 'openapi-types';

export class OpenApiSpec {
    public constructor(private readonly spec: OpenAPIV3.Document) {
        //
    }

    public get paths() {
        return Object.entries(this.spec.paths ?? {});
    }
}
