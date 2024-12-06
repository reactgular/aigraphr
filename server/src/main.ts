import {MainModule} from '@/main.module';
import {TRPC_ROUTER_SYMBOL, TrpcRouter} from '@/trpc/trpc.router';
import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import * as trpcExpress from '@trpc/server/adapters/express';

async function bootstrap() {
    const production = false;
    const port = process.env.PORT ?? 3000;

    const logger = new Logger('bootstrap');

    const main = await NestFactory.create(MainModule);
    main.enableCors();
    main.use(
        `/trpc`,
        trpcExpress.createExpressMiddleware({
            router: main.get<TrpcRouter>(TRPC_ROUTER_SYMBOL)
        })
    );

    await main.listen(port, '0.0.0.0');

    const url = `http://${production ? '0.0.0.0' : 'localhost'}:${port}`;
    logger.log(`🔥 AIGraphr is running on: ${url}/`);
    logger.log(`🔥 tRPC UI is running on: ${url}/trpc-ui`);
}

bootstrap().then();
