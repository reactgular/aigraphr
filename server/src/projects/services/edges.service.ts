import {
    EdgeCreateDto,
    EdgeDto,
    EdgeEntity,
    EdgeUpdateDto
} from '@/projects/entities/edge.entity';
import {NodeDto} from '@/projects/entities/node.entity';
import {EDGES_REPOSITORY} from '@/projects/project-symbols';
import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';

@Injectable()
export class EdgesService {
    public constructor(
        @Inject(EDGES_REPOSITORY)
        private readonly edges: Repository<EdgeEntity>
    ) {}

    public async create(data: EdgeCreateDto): Promise<EdgeDto> {
        return {} as NodeDto;
    }

    public async exists(id: number): Promise<boolean> {
        return await this.edges.exists({where: {id}});
    }

    public async get(id: number): Promise<EdgeDto> {
        return {} as NodeDto;
    }

    public async index(): Promise<Array<EdgeDto>> {
        return await this.edges.find();
    }

    public async remove(id: number): Promise<void> {
        return;
    }

    public async update(id: number, data: EdgeUpdateDto): Promise<EdgeDto> {
        return {} as NodeDto;
    }
}
