import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Patch, Type} from '@nestjs/common';
import {
    ApiBody,
    ApiExtraModels,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation
} from '@nestjs/swagger';

export function ScaUpdate<TBody extends object, TResponse extends ScaEntity>(
    bodyDto: Type<TBody>,
    responseDto: Type<TResponse>,
    paramId: string = 'id'
) {
    const name = toHumanUtils(responseDto.name);
    const decorators: Array<MethodDecorator> = [
        Patch(`:${paramId}`),
        ApiOperation({summary: `Update a ${name} by ${paramId}`}),
        ApiBody({type: bodyDto}),
        ApiExtraModels(bodyDto, responseDto),
        ApiOkResponse({
            description: `Return a ${name} by ${paramId}`,
            type: responseDto
        }),
        ApiNotFoundResponse({
            description: `A ${name} with the specified ${paramId} was not found`
        }),
        ScaValidateResponse(responseDto)
    ];
    return applyDecorators(...decorators);
}

export type ScaUpdateResponse<T extends ScaEntity> = Promise<T>;
