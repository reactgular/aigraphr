import {
    AttributeCreateDto,
    AttributeDto,
    AttributeEntity,
    AttributeUpdateDto
} from '@/projects/entities/attribute.entity';
import {NodeDto} from '@/projects/entities/node.entity';
import {ATTRIBUTES_REPOSITORY} from '@/projects/project-symbols';
import {Inject, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';

@Injectable()
export class AttributesService {
    public constructor(
        @Inject(ATTRIBUTES_REPOSITORY)
        private readonly attributes: Repository<AttributeEntity>
    ) {}

    public async exists(id: number): Promise<boolean> {
        return await this.attributes.exists({where: {id}});
    }

    public async index(): Promise<Array<AttributeDto>> {
        return await this.attributes.find();
    }

    public async get(id: number): Promise<AttributeDto> {
        return {} as NodeDto;
    }

    public async create(data: AttributeCreateDto): Promise<AttributeDto> {
        return {} as NodeDto;
    }

    public async update(
        id: number,
        data: AttributeUpdateDto
    ): Promise<AttributeDto> {
        return {} as NodeDto;
    }

    public async remove(id: number): Promise<void> {
        return;
    }
}
