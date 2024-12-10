import {WorkspacesController} from '@/workspaces/controllers/workspaces.controller';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    controllers: [WorkspacesController],
    providers: []
})
export class WorkspacesModule {}
