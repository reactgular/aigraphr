import {ProjectEntity} from '@/entities/project.entity';
import {ScaffoldCrudService} from '@/scaffold/services/scaffold-crud.service';
import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ProjectsService extends ScaffoldCrudService<ProjectEntity> {
    private readonly log = new Logger('ProjectsService');

    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projects: Repository<ProjectEntity>
    ) {
        super(projects);
    }

    public async open(id: number): Promise<boolean> {
        this.log.log(`Opening project ${id}`);
        return true;
    }
}
