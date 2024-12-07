import {MainModule} from '@/main.module';
import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

async function bootstrap() {
    const production = false;
    const port = process.env.PORT ?? 3000;

    const logger = new Logger('bootstrap');

    const main = await NestFactory.create(MainModule);
    main.enableCors();

    await main.listen(port, '0.0.0.0');

    logger.log(
        `🔥 AIGraphr is running on: http://${
            production ? '0.0.0.0' : 'localhost'
        }:${port}/`
    );
}

bootstrap().then();
