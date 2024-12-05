import {All, Controller, Inject, OnModuleInit} from '@nestjs/common';
import {AnyRouter} from '@trpc/server';
import {AppRouterHost} from 'nestjs-trpc';
import {renderTrpcPanel} from 'trpc-panel';

@Controller()
export class TrpcPanelController implements OnModuleInit {
    private appRouter!: AnyRouter;

    public constructor(
        @Inject(AppRouterHost) private readonly appRouterHost: AppRouterHost
    ) {}

    public onModuleInit() {
        this.appRouter = this.appRouterHost.appRouter;
    }

    @All('/panel')
    public panel(): string {
        return renderTrpcPanel(this.appRouter, {
            url: 'http://localhost:3000/trpc'
        });
    }
}
