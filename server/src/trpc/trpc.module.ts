import {TrpcUiController} from '@/trpc/trpc-ui.controller';
import {TRPC_ROUTER_SYMBOL, trpcRouter} from '@/trpc/trpc.router';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    // @todo this should only be provided in dev mode
    controllers: [TrpcUiController],
    providers: [
        {
            provide: TRPC_ROUTER_SYMBOL,
            useValue: trpcRouter
        }
    ],
    exports: [TRPC_ROUTER_SYMBOL]
})
export class TrpcModule {}
