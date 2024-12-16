import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceEntity,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {WORKSPACES_REPOSITORY} from '@/projects/project-symbols';
import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {Inject, Injectable, Logger} from '@nestjs/common';
import {DeepPartial, Not, Repository} from 'typeorm';

@Injectable()
export class WorkspacesService extends ScaCrudService<
    WorkspaceEntity,
    WorkspaceDto,
    WorkspaceCreateDto,
    WorkspaceUpdateDto
> {
    private readonly log: Logger = new Logger('WorkspacesService');

    public constructor(
        @Inject(WORKSPACES_REPOSITORY)
        private readonly workspaces: Repository<WorkspaceEntity>
    ) {
        super(workspaces, WorkspaceEntity);
    }

    public async existsByName(name: string, ignoreId?: number) {
        return ignoreId
            ? (await this.workspaces.count({
                  where: {
                      id: Not(ignoreId),
                      name
                  }
              })) > 0
            : (await this.workspaces.count({where: {name}})) > 0;
    }

    public async getName(id: number): Promise<string> {
        const {name} = await this.workspaces.findOneOrFail({
            where: {id},
            select: {name: true}
        });
        return name;
    }

    protected fromCreateDto(
        createDto: WorkspaceCreateDto
    ): Omit<WorkspaceEntity, 'id'> {
        return createDto as WorkspaceEntity;
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
