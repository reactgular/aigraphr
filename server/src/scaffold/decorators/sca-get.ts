import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {toHumanEntity} from '@/scaffold/utils/to-human.entity';
import {applyDecorators, Get, Type} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';

export function ScaGet<T extends ScaffoldEntity>(dto: Type<T>) {
    const name = toHumanEntity(dto);
    const decorators: Array<MethodDecorator> = [
        Get(':id'),
        ApiOperation({summary: `Get ${name} by ID`}),
        ScaResponse(dto)
    ];
    return applyDecorators(...decorators);
}

export type ScaGetResponse<T extends ScaffoldEntity> = Promise<T>;
