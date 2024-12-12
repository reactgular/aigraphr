import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceEntity,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {ProjectDatabasesService} from '@/projects/services/project-databases.service';
import {ScaffoldCrudDtoService} from '@/scaffold/services/scaffold-crud-dto.service';
import {ScaffoldEntityService} from '@/scaffold/services/scaffold-entity.service';
import {Injectable, Logger} from '@nestjs/common';
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

    private readonly workspaces: Repository<WorkspaceEntity>;

    /**
     * @todo: I bet we could use a provider factory in the Workspaces module to provide the Repository<WorkspaceEntity> instance
     */
    public constructor(private readonly databases: ProjectDatabasesService) {
        super(databases.workspaces(), WorkspaceEntity);
        this.workspaces = databases.workspaces();
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
