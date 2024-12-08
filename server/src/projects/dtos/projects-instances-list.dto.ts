import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsOptional} from 'class-validator';

export enum ProjectsInstancesSort {
    ASC = 'asc',
    DESC = 'desc'
}

export enum ProjectsInstancesOrderBy {
    NAME = 'name',
    CREATED_AT = 'createdAt'
}

export class ProjectsInstancesListDto {
    @IsEnum(ProjectsInstancesSort)
    @IsOptional()
    @ApiProperty({enum: ProjectsInstancesSort, required: false})
    sort: string = ProjectsInstancesSort.ASC;

    @IsEnum(ProjectsInstancesOrderBy)
    @IsOptional()
    @ApiProperty({enum: ProjectsInstancesOrderBy, required: false})
    sortBy: string = ProjectsInstancesOrderBy.NAME;
}
