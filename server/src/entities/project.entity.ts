import {IsProfileName} from '@/projects/decorators/is-profile-name.decorator';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {IsBoolean, IsNumber, IsOptional, Min} from 'class-validator';
import {Column, Entity, Unique} from 'typeorm';

@Entity({name: 'projects'})
@Unique(['name'])
export class ProjectEntity extends ScaEntity {
    @IsProfileName()
    @Column()
    name: string;

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
] as const) {
    @IsNumber()
    @IsOptional()
    @Min(1)
    @ApiProperty({
        description: 'The ID of the project to clone',
        example: 1234
    })
    cloneId?: number;
}

export class ProjectUpdateDto extends PartialType(
    OmitType(ProjectDto, ['id'] as const)
) {}
