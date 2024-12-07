import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
    const production = false;
    const port = process.env.PORT ?? 3000;

    const logger = new Logger('bootstrap');

    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(port, '0.0.0.0');

    logger.log(
        `🔥 AIGraphr is running on: http://${
            production ? '0.0.0.0' : 'localhost'
        }:${port}/`
    );
}

bootstrap().then();
