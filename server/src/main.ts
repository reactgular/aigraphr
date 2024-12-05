import {MainModule} from '@/main.module';
import {TrpcRouter} from '@/trpc/trpc.router';
import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

async function bootstrap() {
    const production = false;
    const port = process.env.PORT ?? 3000;

    const logger = new Logger('bootstrap');

    const main = await NestFactory.create(MainModule);
    main.enableCors();

    const trpcRouter = main.get(TrpcRouter);
    await trpcRouter.applyMiddleware(main);
    await main.listen(port, '0.0.0.0');

    logger.log(
        `🔥 AIGraphr is running on: http://${
            production ? '0.0.0.0' : 'localhost'
        }:${port}/`
    );

    logger.log(
        `🔥 tRPC Panel is running on: http://${
            production ? '0.0.0.0' : 'localhost'
        }:${port}/panel`
    );
}

bootstrap().then();
