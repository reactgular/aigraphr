import {ScaExceptionFilter} from '@/scaffold/decorators/sca-exception-filter';
import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Patch, Type} from '@nestjs/common';
import {
    ApiBody,
    ApiExtraModels,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam
} from '@nestjs/swagger';

interface ScaUpdateOptions<TBody extends object, TResponse extends ScaEntity> {
    bodyDto: Type<TBody>;
    decorators?: () => Array<MethodDecorator>;
    paramId?: string;
    responseDto: Type<TResponse>;
}

export function ScaUpdate<TBody extends object, TResponse extends ScaEntity>({
    bodyDto,
    responseDto,
    paramId = 'id',
    decorators: decoratorsFn
}: ScaUpdateOptions<TBody, TResponse>) {
    const name = toHumanUtils(responseDto.name);
    const decorators: Array<MethodDecorator> = [
        Patch(`:${paramId}`),
        ApiParam({
            name: paramId,
            type: Number,
            required: true,
            description: `The ID of a ${name}`
        }),
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
        ScaValidateResponse(responseDto),
        ...ScaExceptionFilter(),
        ...(decoratorsFn?.() ?? [])
    ];
    return applyDecorators(...decorators);
}

export type ScaUpdateResponse<T extends ScaEntity> = Promise<T>;
