import {AppModule} from '@/app/app.module';
import {TrpcPanelModule} from '@/trpc-panel/trpc-panel.module';
import {WorkspacesModule} from '@/workspaces/workspaces.module';
import {Module} from '@nestjs/common';

@Module({
    imports: [AppModule, WorkspacesModule, TrpcPanelModule],
    providers: []
})
export class MainModule {}
