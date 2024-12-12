import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {OmitType, PartialType} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {Column, Entity} from 'typeorm';

@Entity({name: 'nodes'})
export class NodeEntity extends ScaffoldEntity {
    @IsString()
    @Column()
    test: string;
}

export class NodeDto extends OmitType(NodeEntity, [] as const) {}

export class NodeCreateDto extends OmitType(NodeDto, ['id'] as const) {}

export class NodeUpdateDto extends PartialType(
    OmitType(NodeDto, ['id'] as const)
) {}
