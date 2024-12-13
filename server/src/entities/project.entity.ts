import {IsProfileName} from '@/projects/decorators/is-profile-name.decorator';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {IsBoolean, IsString} from 'class-validator';
import {Column, Entity} from 'typeorm';

@Entity({name: 'projects'})
export class ProjectEntity extends ScaEntity {
    // TODO: this needs a unique index constraint
    @IsProfileName()
    @Column()
    name: string;

    @IsString()
    @Column()
    test: string;

    @IsBoolean()
    @ApiProperty({
        description: 'The open status of the project'
    })
    @Column({default: false})
    open: boolean;
}

export class ProjectDto extends OmitType(ProjectEntity, [] as const) {}

export class ProjectCreateDto extends OmitType(ProjectDto, [
    'id',
    'open'
] as const) {}

export class ProjectUpdateDto extends PartialType(
    OmitType(ProjectDto, ['id'] as const)
) {}
