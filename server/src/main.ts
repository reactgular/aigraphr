import {MainModule} from '@/main.module';
import {mainRouter} from '@/main.router';
import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import * as trpcExpress from '@trpc/server/adapters/express';

async function bootstrap() {
    const production = false;
    const port = process.env.PORT ?? 3000;

    const logger = new Logger('bootstrap');

    const main = await NestFactory.create(MainModule);
    main.enableCors();
    // @todo we can get mainRouter from main.get(MAIN_ROUTER_PROVIDER)
    main.use(
        `/trpc`,
        trpcExpress.createExpressMiddleware({router: mainRouter})
    );

    await main.listen(port, '0.0.0.0');

    const url = `http://${production ? '0.0.0.0' : 'localhost'}:${port}`;
    logger.log(`🔥 AIGraphr is running on: ${url}/`);
    logger.log(`🔥 tRPC UI is running on: ${url}/trpc-ui`);
}

bootstrap().then();
