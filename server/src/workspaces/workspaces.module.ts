import {WorkspacesRouter} from '@/workspaces/workspaces.router';
import {Module} from '@nestjs/common';
import {TRPCModule} from 'nestjs-trpc';

@Module({
    imports: [TRPCModule],
    controllers: [],
    providers: [WorkspacesRouter]
})
export class WorkspacesModule {}
