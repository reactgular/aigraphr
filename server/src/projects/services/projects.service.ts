import {ProjectEntity} from '@/entities/project.entity';
import {ScaffoldEntityService} from '@/scaffold/services/scaffold-entity.service';
import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ProjectsService extends ScaffoldEntityService<ProjectEntity> {
    private readonly log = new Logger('ProjectsService');

    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projects: Repository<ProjectEntity>
    ) {
        super(projects, ProjectEntity);
    }
}
