import {
    ProjectCreateDto,
    ProjectDto,
    ProjectEntity,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {ScaffoldDtoService} from '@/scaffold/services/scaffold-dto.service';
import {ScaffoldEntityService} from '@/scaffold/services/scaffold-entity.service';
import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ProjectsService
    extends ScaffoldEntityService<ProjectEntity>
    implements
        ScaffoldDtoService<
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
