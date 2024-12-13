import {ScaEntity} from '@/scaffold/models/sca.entity';
import {OmitType, PartialType} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {Column, Entity} from 'typeorm';

@Entity({name: 'attributes'})
export class AttributeEntity extends ScaEntity {
    @IsString()
    @Column()
    test: string;
}

export class AttributeDto extends OmitType(AttributeEntity, [] as const) {}

export class AttributeCreateDto extends OmitType(AttributeDto, [
    'id'
] as const) {}

export class AttributeUpdateDto extends PartialType(
    OmitType(AttributeDto, ['id'] as const)
) {}
