import {GrNodeDto} from '@/graph/dtos/gr-node.dto';
import {GrParamDto} from '@/graph/dtos/gr-param.dto';
import {ScaExceptionFilterDto} from '@/scaffold/dtos/sca-exception-filter.dto';
import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from '@nestjs/swagger';
import {OperationIdFactory} from '@nestjs/swagger/dist/interfaces/swagger-document-options.interface';

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

    const operationIdFactory: OperationIdFactory = (
        controllerKey,
        methodKey
    ) => {
        return `${controllerKey.replace('Controller', '')}_${methodKey}`;
    };

    return SwaggerModule.createDocument(app, config, {
        operationIdFactory,
        extraModels: [ScaExceptionFilterDto, GrNodeDto, GrParamDto]
    });
};
