import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Get, Type} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';

export function ScaGet<T extends ScaffoldEntity>(dto: Type<T>) {
    const name = toHumanUtils(dto);
    const decorators: Array<MethodDecorator> = [
        Get(':id'),
        ApiOperation({summary: `Get ${name} by ID`}),
        ScaResponse(dto)
    ];
    return applyDecorators(...decorators);
}
