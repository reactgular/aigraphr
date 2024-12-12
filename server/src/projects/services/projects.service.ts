import {
    ProjectCreateDto,
    ProjectDto,
    ProjectEntity,
    ProjectUpdateDto
} from '@/entities/project.entity';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ProjectsService {
    public constructor(
        @InjectRepository(ProjectEntity)
        private readonly projects: Repository<ProjectEntity>
    ) {}

    public async exists(id: number): Promise<boolean> {
        return await this.projects.exists({where: {id}});
    }

    public async index(): Promise<Array<ProjectDto>> {
        return await this.projects.find();
    }

    public async get(id: number): Promise<ProjectDto> {
        return {} as ProjectDto;
    }

    public async create(data: ProjectCreateDto): Promise<ProjectDto> {
        return {} as ProjectDto;
    }

    public async update(
        id: number,
        data: ProjectUpdateDto
    ): Promise<ProjectDto> {
        return {} as ProjectDto;
    }

    public async remove(id: number): Promise<void> {
        return;
    }
}
