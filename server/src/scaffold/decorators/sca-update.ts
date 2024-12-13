import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanEntity} from '@/scaffold/utils/to-human.entity';
import {applyDecorators, Post, Type} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';

export function ScaUpdate<T extends ScaEntity>(dto: Type<T>) {
    const name = toHumanEntity(dto);
    const decorators: Array<MethodDecorator> = [
        Post(':id'),
        ApiOperation({summary: `Update a ${name} by ID`}),
        ScaResponse(dto)
    ];
    return applyDecorators(...decorators);
}

export type ScaUpdateResponse<T extends ScaEntity> = Promise<T>;
