import {ScaffoldCrudDtoService} from '@/_deprecated/scaffold-crud-dto.service';
import {ScaffoldEntityService} from '@/_deprecated/scaffold-entity.service';
import {
    ProjectCreateDto,
    ProjectDto,
    ProjectEntity,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

/**
 * @deprecated
 */
@Injectable()
export class ProjectsService
    extends ScaffoldEntityService<ProjectEntity>
    implements
        ScaffoldCrudDtoService<
            ProjectEntity,
            ProjectDto,
            ProjectCreateDto,
            ProjectUpdateDto
        >
{
    private readonly log = new Logger('ProjectsService');

    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projects: Repository<ProjectEntity>
    ) {
        super(projects, ProjectEntity);
    }

    public toGetDto(entity: ProjectEntity): ProjectDto {
        return entity;
    }

    public fromCreateDto(create: ProjectCreateDto): Partial<ProjectEntity> {
        return create;
    }

    public fromUpdateDto(update: ProjectUpdateDto): Partial<ProjectEntity> {
        return update;
    }
}
