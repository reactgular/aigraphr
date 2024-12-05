import {All, Controller, OnModuleInit} from '@nestjs/common';
import {AnyRouter} from '@trpc/server';
import {renderTrpcPanel} from 'trpc-ui';

@Controller()
export class TrpcUiController implements OnModuleInit {
    private appRouter!: AnyRouter;

    public constructor() {}

    public onModuleInit() {
        this.appRouter = null; // Replace with your app router
    }

    @All('/panel')
    public panel(): string {
        return renderTrpcPanel(this.appRouter, {
            url: 'http://localhost:3000/trpc'
        });
    }
}
