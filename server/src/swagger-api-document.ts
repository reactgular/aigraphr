import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from '@nestjs/swagger';

export interface SwaggerApiDocumentOptions {
    app: INestApplication;

    description: string;

    title: string;

    version: string;
}

export const swaggerApiDocument = ({
    app,
    title,
    description,
    version
}: SwaggerApiDocumentOptions): OpenAPIObject => {
    const config = new DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(version)
        .addBearerAuth()
        .build();

    return SwaggerModule.createDocument(app, config);
};
