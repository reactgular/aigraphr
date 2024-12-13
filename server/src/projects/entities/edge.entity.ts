import {ScaEntity} from '@/scaffold/models/sca.entity';
import {OmitType, PartialType} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {Column, Entity} from 'typeorm';

@Entity({name: 'edges'})
export class EdgeEntity extends ScaEntity {
    @IsString()
    @Column()
    test: string;
}

export class EdgeDto extends OmitType(EdgeEntity, [] as const) {}

export class EdgeCreateDto extends OmitType(EdgeDto, ['id'] as const) {}

export class EdgeUpdateDto extends PartialType(
    OmitType(EdgeDto, ['id'] as const)
) {}
