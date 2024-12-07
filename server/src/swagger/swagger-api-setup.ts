import {INestApplication, Logger} from '@nestjs/common';
import {OpenAPIObject, SwaggerModule} from '@nestjs/swagger';

export interface SwaggerApiStartOptions {
    app: INestApplication;

    document: OpenAPIObject;

    path: string;

    port: number;
}

export const swaggerApiSetup = ({
    app,
    document,
    path,
    port
}: SwaggerApiStartOptions) => {
    const logger = new Logger('swaggerApiSetup');

    logger.log(`🚀 Swagger is running on: http://localhost:${port}/${path}`);

    SwaggerModule.setup(path, app, document, {
        swaggerOptions: {
            docExpansion: 'none', // options are: none, list, full
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
            filter: true,
            defaultModelsExpandDepth: 1,
            defaultModelExpandDepth: 1,
            persistAuthorization: true,
            displayRequestDuration: true
            // tryItOutEnabled: true
        }
    });
};
