import {
    WorkspaceCreateDto,
    WorkspaceDto,
    WorkspaceEntity,
    WorkspaceUpdateDto
} from '@/projects/entities/workspace.entity';
import {WORKSPACES_REPOSITORY} from '@/projects/project-symbols';
import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';

@Injectable()
export class WorkspacesService {
    public constructor(
        @Inject(WORKSPACES_REPOSITORY)
        private readonly workspaces: Repository<WorkspaceEntity>
    ) {}

    public async exists(id: number): Promise<boolean> {
        return await this.workspaces.exists({where: {id}});
    }

    public async index(): Promise<Array<WorkspaceDto>> {
        return await this.workspaces.find();
    }

    public async get(id: number): Promise<WorkspaceDto> {
        return {} as WorkspaceDto;
    }

    public async create(data: WorkspaceCreateDto): Promise<WorkspaceDto> {
        return {} as WorkspaceDto;
    }

    public async update(
        id: number,
        data: WorkspaceUpdateDto
    ): Promise<WorkspaceDto> {
        return {} as WorkspaceDto;
    }

    public async remove(id: number): Promise<void> {
        return;
    }
}
