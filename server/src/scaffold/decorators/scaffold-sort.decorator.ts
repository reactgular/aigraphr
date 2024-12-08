import {applyDecorators} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsOptional} from 'class-validator';

export enum ScaffoldSort {
    ASC = 'asc',
    DESC = 'desc'
}

export function IsScaffoldSort() {
    return applyDecorators(
        IsEnum(ScaffoldSort),
        IsOptional(),
        ApiProperty({
            enum: ScaffoldSort,
            required: false
        })
    );
}
