import {ProjectDatabasesService} from '@/projects/services/project-databases.service';
import {Controller, Get} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Workspaces')
@Controller('projects/:projectId/workspaces')
export class WorkspacesController {
    public constructor(private readonly databases: ProjectDatabasesService) {
        //
    }

    @Get()
    @ApiOperation({})
    findAll() {
        return 'This action returns all workspaces';
    }
}
