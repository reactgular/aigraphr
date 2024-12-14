import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Post, Type} from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiOperation
} from '@nestjs/swagger';

export function ScaCreate<TBody extends object, TResponse extends ScaEntity>(
    bodyDto: Type<TBody>,
    responseDto: Type<TResponse>
) {
    const name = toHumanUtils(responseDto.name);
    const decorators: Array<MethodDecorator> = [
        Post(),
        ApiOperation({summary: `Create a new ${name}`}),
        ApiBody({type: bodyDto}),
        ApiExtraModels(bodyDto, responseDto),
        ApiCreatedResponse({
            description: `Return a new ${name}`,
            type: responseDto
        }),
        ScaValidateResponse(responseDto)
    ];
    return applyDecorators(...decorators);
}

export type ScaCreateResponse<T extends ScaEntity> = Promise<T>;
