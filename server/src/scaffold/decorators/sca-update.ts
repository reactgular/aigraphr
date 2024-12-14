import {ScaResponse} from '@/scaffold/decorators/sca-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Post, Type} from '@nestjs/common';
import {ApiBody, ApiExtraModels, ApiOperation} from '@nestjs/swagger';

export function ScaUpdate<TBody extends object, TResponse extends ScaEntity>(
    bodyDto: Type<TBody>,
    responseDto: Type<TResponse>
) {
    const name = toHumanUtils(responseDto.name);
    const decorators: Array<MethodDecorator> = [
        Post(':id'),
        ApiOperation({summary: `Update a ${name} by ID`}),
        ApiBody({type: bodyDto}),
        ApiExtraModels(bodyDto, responseDto),
        ScaResponse(responseDto)
    ];
    return applyDecorators(...decorators);
}

export type ScaUpdateResponse<T extends ScaEntity> = Promise<T>;
