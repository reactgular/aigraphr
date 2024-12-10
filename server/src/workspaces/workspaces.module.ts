import {ProjectsModule} from '@/projects/projects.module';
import {WorkspacesController} from '@/workspaces/controllers/workspaces.controller';
import {Module} from '@nestjs/common';

@Module({
    imports: [ProjectsModule],
    controllers: [WorkspacesController],
    providers: []
})
export class WorkspacesModule {}
