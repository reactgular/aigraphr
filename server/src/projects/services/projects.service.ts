import {ProjectEntity} from '@/entities/project.entity';
import {ScaffoldCrudService} from '@/scaffold/services/scaffold-crud.service';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ProjectsService extends ScaffoldCrudService<ProjectEntity> {
    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projects: Repository<ProjectEntity>
    ) {
        super(projects);
    }
}
