import {ProjectEntity} from '@/entities/project.entity';
import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ProjectsService extends ScaCrudService<ProjectEntity> {
    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projects: Repository<ProjectEntity>
    ) {
        super(projects, ProjectEntity);
    }
}
