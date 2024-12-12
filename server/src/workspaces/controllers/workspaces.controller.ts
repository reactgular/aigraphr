import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {ProjectGuard} from '@/projects/gaurds/project.guard';
import {ProjectDatabasesService} from '@/projects/services/project-databases.service';
import {createCrudController} from '@/scaffold/controllers/scaffold-crud.controller';
import {ScaffoldCrudService} from '@/scaffold/services/scaffold-crud.service';
import {WorkspacesService} from '@/workspaces/services/workspaces.service';
import {Controller, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Workspaces')
@Controller('projects/:projectId/workspaces')
@UseGuards(ProjectGuard)
export class WorkspacesController extends createCrudController({
    getDto: WorkspaceDto,
    createDto: WorkspaceCreateDto,
    updateDto: WorkspaceUpdateDto
}) {
    public constructor(
        private readonly databases: ProjectDatabasesService,
        workspaces: WorkspacesService
    ) {
        super(new ScaffoldCrudService(workspaces, workspaces));
    }
}
