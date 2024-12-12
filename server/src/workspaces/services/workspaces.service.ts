import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceEntity,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {WORKSPACES_REPOSITORY} from '@/projects/project-symbols';
import {ScaffoldCrudDtoService} from '@/scaffold/services/scaffold-crud-dto.service';
import {ScaffoldEntityService} from '@/scaffold/services/scaffold-entity.service';
import {Inject, Injectable, Logger} from '@nestjs/common';
import {Repository} from 'typeorm';

@Injectable()
export class WorkspacesService
    extends ScaffoldEntityService<WorkspaceEntity>
    implements
        ScaffoldCrudDtoService<
            WorkspaceEntity,
            WorkspaceDto,
            WorkspaceCreateDto,
            WorkspaceUpdateDto
        >
{
    private readonly log = new Logger('WorkspacesService');

    public constructor(
        @Inject(WORKSPACES_REPOSITORY)
        private readonly workspaces: Repository<WorkspaceEntity>
    ) {
        super(workspaces, WorkspaceEntity);
    }

    public toGetDto(entity: WorkspaceEntity): WorkspaceDto {
        return entity;
    }

    public fromCreateDto(create: WorkspaceCreateDto): Partial<WorkspaceEntity> {
        return create;
    }

    public fromUpdateDto(update: WorkspaceUpdateDto): Partial<WorkspaceEntity> {
        return update;
    }
}
