import {ApiProperty, OmitType} from '@nestjs/swagger';
import {IsNumber, Min} from 'class-validator';

/**
 * @deprecated
 */
export class ProjectIdEntityIdDto {
    @IsNumber()
    @Min(1)
    @ApiProperty()
    id: number;

    @IsNumber()
    @Min(1)
    @ApiProperty()
    projectId: number;
}

/**
 * @deprecated
 */
export class ProjectIdDto extends OmitType(ProjectIdEntityIdDto, [
    'id'
] as const) {}
