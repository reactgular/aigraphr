import {ProjectGuard} from '@/projects/gaurds/project.guard';
import {ProjectDatabasesService} from '@/projects/services/project-databases.service';
import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@ApiTags('Workspaces')
@Controller('projects/:projectId/workspaces')
@UseGuards(ProjectGuard)
export class WorkspacesController {
    public constructor(private readonly databases: ProjectDatabasesService) {
        //
    }

    @Get()
    @ApiOperation({})
    public findAll(@Param('projectId') projectId: string): string {
        console.log({projectId});
        return 'This action returns all workspaces';
    }
}
