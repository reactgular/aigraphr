import {AppModule} from '@/app/app.module';
import {TrpcModule} from '@/trpc/trpc.module';
import {WorkspacesModule} from '@/workspaces/workspaces.module';
import {Module} from '@nestjs/common';

@Module({
    imports: [AppModule, WorkspacesModule, TrpcModule],
    providers: []
})
export class MainModule {}
