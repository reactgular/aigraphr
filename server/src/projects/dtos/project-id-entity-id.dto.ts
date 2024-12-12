import {ApiProperty, OmitType} from '@nestjs/swagger';
import {IsNumber, Min} from 'class-validator';

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

export class ProjectIdDto extends OmitType(ProjectIdEntityIdDto, [
    'id'
] as const) {}
