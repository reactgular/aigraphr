import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsOptional} from 'class-validator';

export class ProjectsInstancesListDto {
    // @todo fix swagger enum
    @IsEnum(['asc', 'desc'])
    @IsOptional()
    @ApiProperty({required: false})
    sort?: string;

    // @todo fix swagger enum
    @IsEnum(['open', 'closed', 'all'])
    @IsOptional()
    @ApiProperty({required: false})
    filter?: string;
}
