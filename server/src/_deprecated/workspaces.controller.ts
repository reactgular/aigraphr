import {createProjectCrudController} from '@/_deprecated/create-project-crud.controller';
import {ScaffoldCrudService} from '@/_deprecated/scaffold-crud.service';
import {WorkspacesService} from '@/_deprecated/workspaces.service';
import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {ProjectGuard} from '@/projects/gaurds/project.guard';
import {Controller, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

/**
 * @deprecated
 */
@ApiTags('Workspaces')
@Controller('projects/:projectId/workspaces')
@UseGuards(ProjectGuard)
export class WorkspacesController extends createProjectCrudController({
    getDto: WorkspaceDto,
    createDto: WorkspaceCreateDto,
    updateDto: WorkspaceUpdateDto
}) {
    public constructor(workspaces: WorkspacesService) {
        super(new ScaffoldCrudService(workspaces, workspaces));
    }
}
