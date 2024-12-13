import {
    NodeCreateDto,
    NodeDto,
    NodeEntity,
    NodeUpdateDto
} from '@/projects/entities/node.entity';
import {NODES_REPOSITORY} from '@/projects/project-symbols';
import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';

@Injectable()
export class NodesService {
    public constructor(
        @Inject(NODES_REPOSITORY)
        private readonly nodes: Repository<NodeEntity>
    ) {}

    public async exists(id: number): Promise<boolean> {
        return await this.nodes.exists({where: {id}});
    }

    public async index(): Promise<Array<NodeDto>> {
        return await this.nodes.find();
    }

    public async get(id: number): Promise<NodeDto> {
        return {} as NodeDto;
    }

    public async create(data: NodeCreateDto): Promise<NodeDto> {
        return {} as NodeDto;
    }

    public async update(id: number, data: NodeUpdateDto): Promise<NodeDto> {
        return {} as NodeDto;
    }

    public async remove(id: number): Promise<void> {
        return;
    }
}
