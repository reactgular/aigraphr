import {MAIN_ROUTER_SYMBOL, mainRouter} from '@/main.router';
import {TrpcUiController} from '@/trpc/trpc-ui.controller';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    // @todo this should only be provided in dev mode
    controllers: [TrpcUiController],
    providers: [
        {
            provide: MAIN_ROUTER_SYMBOL,
            useValue: mainRouter
        }
    ],
    exports: [MAIN_ROUTER_SYMBOL]
})
export class TrpcModule {}
