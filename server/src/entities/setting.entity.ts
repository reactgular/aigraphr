import {ScaEntity} from '@/scaffold/models/sca.entity';
import {OmitType} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {Column, Entity} from 'typeorm';

@Entity({name: 'settings'})
export class SettingEntity extends ScaEntity {
    @IsString()
    @Column()
    test: string;
}

export class SettingDto extends OmitType(SettingEntity, ['id'] as const) {}
