import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanEntity} from '@/scaffold/utils/to-human.entity';
import {applyDecorators, Get, Type} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';

export function ScaGet<T extends ScaEntity>(dto: Type<T>) {
    const name = toHumanEntity(dto);
    const decorators: Array<MethodDecorator> = [
        Get(':id'),
        ApiOperation({summary: `Get ${name} by ID`}),
        ScaResponse(dto)
    ];
    return applyDecorators(...decorators);
}

export type ScaGetResponse<T extends ScaEntity> = Promise<T>;
