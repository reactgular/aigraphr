import {EnvConfig} from '@/configs/env.config';
import {TypeormExceptionFilter} from '@/filters/typeorm-exception.filter';
import {MainModule} from '@/main.module';
import {scaValidationPipe} from '@/scaffold/pipes/sca-validation.pipe';
import {swaggerApiDocument} from '@/swagger/swagger-api-document';
import {swaggerApiSave} from '@/swagger/swagger-api-save';
import {swaggerApiSetup} from '@/swagger/swagger-api-setup';
import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {HttpAdapterHost, NestFactory} from '@nestjs/core';
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
    app.useGlobalPipes(scaValidationPipe());
    app.useGlobalFilters(new TypeormExceptionFilter(app.get(HttpAdapterHost)));
    app.enableShutdownHooks();
    app.setGlobalPrefix('api');

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
