import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceEntity,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {WORKSPACES_REPOSITORY} from '@/projects/project-symbols';
import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {Inject, Injectable} from '@nestjs/common';
import {DeepPartial, Repository} from 'typeorm';

@Injectable()
export class WorkspacesService extends ScaCrudService<
    WorkspaceEntity,
    WorkspaceDto,
    WorkspaceCreateDto,
    WorkspaceUpdateDto
> {
    public constructor(
        @Inject(WORKSPACES_REPOSITORY)
        private readonly workspaces: Repository<WorkspaceEntity>
    ) {
        super(workspaces, WorkspaceEntity);
    }

    protected fromCreateDto(
        createDto: WorkspaceCreateDto
    ): Omit<WorkspaceEntity, 'id'> {
        return createDto;
    }

    protected fromUpdateDto(
        id: number,
        updateDto: WorkspaceUpdateDto
    ): DeepPartial<WorkspaceEntity> {
        return {
            id,
            ...updateDto
        };
    }

    protected toDto(entity: WorkspaceEntity): WorkspaceDto {
        return entity;
    }
}
