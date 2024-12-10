import {ProjectEntity} from '@/models/project.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ProjectsService {
    public constructor(
        @InjectRepository(ProjectEntity)
        private projects: Repository<ProjectEntity>
    ) {}

    public findAll(): Promise<ProjectEntity[]> {
        return this.projects.find();
    }

    public findOne(id: number): Promise<ProjectEntity | null> {
        return this.projects.findOneBy({id});
    }

    public async remove(id: number): Promise<void> {
        await this.projects.delete(id);
    }
}
