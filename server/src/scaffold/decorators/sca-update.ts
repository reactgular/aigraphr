import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Post, Type} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';

export function ScaUpdate<T extends ScaffoldEntity>(dto: Type<T>) {
    const name = toHumanUtils(dto);
    const decorators: Array<MethodDecorator> = [
        Post(':id'),
        ApiOperation({summary: `Update a ${name} by ID`}),
        ScaResponse(dto)
    ];
    return applyDecorators(...decorators);
}
