import {ProjectsModule} from '@/projects/projects.module';
import {WorkspacesController} from '@/workspaces/controllers/workspaces.controller';
import {WorkspacesService} from '@/workspaces/services/workspaces.service';
import {Module} from '@nestjs/common';

@Module({
    imports: [ProjectsModule],
    controllers: [WorkspacesController],
    providers: [WorkspacesService]
})
export class WorkspacesModule {}
