import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {projectCrudMixin} from '@/projects/mixins/project-crud.mixin';
import {WorkspacesService} from '@/projects/services/workspaces.service';
import {scaValidatorMixin} from '@/scaffold/mixins/sca-validator.mixin';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

const paramId = 'workspaceId';

@ApiTags('Workspaces')
@Controller(`projects/:projectId/workspaces`)
export class WorkspacesController extends projectCrudMixin(
    {
        paramId,
        dto: WorkspaceDto,
        createDto: WorkspaceCreateDto,
        updateDto: WorkspaceUpdateDto
    },
    scaValidatorMixin({
        paramId,
        createDto: WorkspaceCreateDto,
        updateDto: WorkspaceUpdateDto
    })
) {
    public constructor(private readonly workspaces: WorkspacesService) {
        super();
    }

    public crud() {
        return this.workspaces;
    }
}
