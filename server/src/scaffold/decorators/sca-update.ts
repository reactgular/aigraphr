import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {toHumanEntity} from '@/scaffold/utils/to-human.entity';
import {applyDecorators, Post, Type} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';

export function ScaUpdate<T extends ScaffoldEntity>(dto: Type<T>) {
    const name = toHumanEntity(dto);
    const decorators: Array<MethodDecorator> = [
        Post(':id'),
        ApiOperation({summary: `Update a ${name} by ID`}),
        ScaResponse(dto)
    ];
    return applyDecorators(...decorators);
}

export type ScaUpdateResponse<T extends ScaffoldEntity> = Promise<T>;
