import {TrpcRouter} from '@/trpc/trpc.router';
import {All, Controller, OnModuleInit} from '@nestjs/common';
import {renderTrpcPanel} from 'trpc-ui';

@Controller()
export class TrpcUiController implements OnModuleInit {
    public constructor(private readonly appRouter: TrpcRouter) {}

    public onModuleInit() {}

    @All('/trpc-ui')
    public panel(): string {
        return renderTrpcPanel(this.appRouter.appRouter, {
            // @todo this should be injected
            url: 'http://localhost:3000/trpc'
        });
    }
}
