import {applyDecorators} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsOptional} from 'class-validator';

export enum ScaffoldSort {
    ASC = 'asc',
    DESC = 'desc'
}

export function IsSortEnum(required: boolean = false) {
    const decorators = [
        IsEnum(ScaffoldSort),
        ApiProperty({
            enum: ScaffoldSort,
            required
        })
    ];
    if (!required) {
        decorators.push(IsOptional());
    }
    return applyDecorators(...decorators);
}
