import {MAIN_ROUTER_SYMBOL, MainRouter} from '@/main.router';
import {All, Controller, Inject} from '@nestjs/common';
import {renderTrpcPanel} from 'trpc-ui';

@Controller()
export class TrpcUiController {
    public constructor(
        @Inject(MAIN_ROUTER_SYMBOL) private readonly mainRouter: MainRouter
    ) {}

    @All('/trpc-ui')
    public panel(): string {
        return renderTrpcPanel(this.mainRouter, {
            // @todo this should be injected
            url: 'http://localhost:3000/trpc'
        });
    }
}
