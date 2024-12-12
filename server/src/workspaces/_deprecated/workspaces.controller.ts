import {createProjectCrudController} from '@/projects/_deprecated/create-project-crud.controller';
import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {ProjectGuard} from '@/projects/gaurds/project.guard';
import {ScaffoldCrudService} from '@/scaffold/_deprecated/scaffold-crud.service';
import {WorkspacesService} from '@/workspaces/_deprecated/workspaces.service';
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
