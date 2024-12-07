import {Logger} from '@nestjs/common';
import {OpenAPIObject} from '@nestjs/swagger';
import * as fs from 'fs';

export const swaggerApiSave = (document: OpenAPIObject, specPath: string) => {
    const logger = new Logger('swaggerApiSave');

    logger.log(`📄 OpenAPI spec: ${specPath}`);

    fs.writeFileSync(specPath, JSON.stringify(document, undefined, 4), {
        encoding: 'utf-8'
    });
};
