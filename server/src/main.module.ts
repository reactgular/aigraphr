import {TrpcPanelModule} from '@/trpc-panel/trpc-panel.module';
import {WorkspacesModule} from '@/workspaces/workspaces.module';
import {Module} from '@nestjs/common';
import {TRPCModule} from 'nestjs-trpc';

@Module({
    imports: [
        TRPCModule.forRoot({
            autoSchemaFile: '../shared/src/trpc'
        }),
        // AppModule,
        WorkspacesModule,
        TrpcPanelModule
    ],
    providers: []
})
export class MainModule {}
