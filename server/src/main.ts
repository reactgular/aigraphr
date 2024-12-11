import {EnvConfig} from '@/configs/env.config';
import {MainModule} from '@/main.module';
import {swaggerApiDocument} from '@/swagger/swagger-api-document';
import {swaggerApiSave} from '@/swagger/swagger-api-save';
import {swaggerApiSetup} from '@/swagger/swagger-api-setup';
import {Logger, ValidationPipe} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {NextFunction, Request, Response} from 'express';
import * as process from 'process';

const specPath = (function (argv: Array<string>): string | undefined {
    for (const arg of argv) {
        if (arg.startsWith('--openapi=')) {
            const [, value] = arg.split('=');
            return value;
        }
    }
    return undefined;
})([...process.argv]);

const production = process.env.NODE_ENV === 'production';

if (production && specPath) {
    throw new Error(
        'Cannot write OpenAPI spec in production. Remove --openapi argument.'
    );
}

async function bootstrap() {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3030;

    const log = new Logger('bootstrap');

    const app = await NestFactory.create(MainModule);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            // Allow only parameters specified in the endpoint
            whitelist: true,
            // Throws error if unknown parameter is provided
            forbidNonWhitelisted: true,
            // implicit type conversion of request params in the DTO
            transform: true,
            transformOptions: {enableImplicitConversion: true}
        })
    );
    app.enableShutdownHooks();

    const config = app.get(ConfigService<EnvConfig>);
    log.log(`🔧 PROJECTS_FOLDER: ${config.get('PROJECTS_FOLDER')}`);

    // DEBUG: This is for debugging on prod server
    // app.useLogger(new Logger('Debug'));
    let reqId = 0;
    const logger2 = new Logger('app');
    app.use(
        (
            {ip, method, originalUrl}: Request,
            res: Response,
            next: NextFunction
        ) => {
            const prefix = `ID:${reqId++}`;
            const msg = `${ip} ${method} ${originalUrl}`;

            logger2.debug(`${prefix} Request: ${msg}`);

            res.on('finish', () =>
                logger2.debug(`${prefix} Response: ${res.statusCode}`)
            );

            next();
        }
    );

    if (!production) {
        const document = swaggerApiDocument({
            app,
            title: 'AIGraphr',
            description: 'AIGraphr API',
            version: '1.0.0'
        });

        if (specPath) {
            swaggerApiSave(document, specPath);
        } else {
            swaggerApiSetup({
                app,
                document,
                path: 'swagger',
                port
            });
        }
    }

    if (production || !specPath) {
        await app.listen(port, '0.0.0.0');

        log.log(
            `🔥 AIGraphr is running on: http://${
                production ? '0.0.0.0' : 'localhost'
            }:${port}/`
        );
    } else {
        log.warn('⚠️ API is exiting without starting.');
    }
}

bootstrap().then();
