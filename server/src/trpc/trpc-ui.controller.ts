import {TRPC_ROUTER_SYMBOL, TrpcRouter} from '@/trpc/trpc.router';
import {All, Controller, Inject} from '@nestjs/common';
import {renderTrpcPanel} from 'trpc-ui';

@Controller()
export class TrpcUiController {
    public constructor(
        @Inject(TRPC_ROUTER_SYMBOL) private readonly trpcRouter: TrpcRouter
    ) {}

    @All('/trpc-ui')
    public panel(): string {
        return renderTrpcPanel(this.trpcRouter, {
            // @todo this should be injected
            url: 'http://localhost:3000/trpc'
        });
    }
}
