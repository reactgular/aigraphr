import {
    NodeCreateDto,
    NodeDto,
    NodeEntity,
    NodeUpdateDto
} from '@/projects/entities/node.entity';
import {NODES_REPOSITORY} from '@/projects/project.symbols';
import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {Inject, Injectable} from '@nestjs/common';
import {DeepPartial, Repository} from 'typeorm';

@Injectable()
export class NodesService extends ScaCrudService<
    NodeEntity,
    NodeDto,
    NodeCreateDto,
    NodeUpdateDto
> {
    public constructor(
        @Inject(NODES_REPOSITORY)
        private readonly nodes: Repository<NodeEntity>
    ) {
        super(nodes, NodeEntity);
    }

    protected fromCreateDto(createDto: NodeCreateDto): Omit<NodeEntity, 'id'> {
        return createDto as NodeEntity;
    }

    protected fromUpdateDto(
        id: number,
        updateDto: NodeUpdateDto
    ): DeepPartial<NodeEntity> {
        return {
            id,
            ...updateDto
        };
    }

    protected toDto(entity: NodeEntity): NodeDto {
        return entity;
    }
}
