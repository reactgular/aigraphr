import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {projectCrudMixin} from '@/projects/mixins/project-crud.mixin';
import {WorkspacesService} from '@/projects/services/workspaces.service';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Workspaces')
@Controller(`projects/:projectId/workspaces`)
export class WorkspacesController extends projectCrudMixin({
    paramId: 'workspaceId',
    dto: WorkspaceDto,
    createDto: WorkspaceCreateDto,
    updateDto: WorkspaceUpdateDto
}) {
    public constructor(private readonly workspaces: WorkspacesService) {
        super();
    }
}
