import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiProperty, OmitType, PartialType} from '@nestjs/swagger';
import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    Min,
    MinLength
} from 'class-validator';
import {Column, Entity, Unique} from 'typeorm';

const PROFILE_FILE_REGEX = /^[a-zA-Z0-9-_]+$/;

@Entity({name: 'projects'})
@Unique(['name'])
export class ProjectEntity extends ScaEntity {
    @IsString()
    @Matches(PROFILE_FILE_REGEX, {
        message: 'The name of the project must be alphanumeric'
    })
    @MinLength(3)
    @MaxLength(128)
    @ApiProperty({
        description: 'The name of the project (alphanumeric)',
        example: 'example-project'
    })
    @Column({length: 128})
    name: string;
}

export class ProjectDto extends OmitType(ProjectEntity, [] as const) {
    @IsBoolean()
    @ApiProperty({
        description: 'The open status of the project'
    })
    open: boolean;
}

/**
 * @deprecated need to switch to using groups
 */
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

/**
 * @deprecated need to switch to using groups
 */
export class ProjectUpdateDto extends PartialType(
    OmitType(ProjectDto, ['id'] as const)
) {}
