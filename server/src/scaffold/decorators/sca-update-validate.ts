import {ScaExceptionFilter} from '@/scaffold/decorators/sca-exception-filter';
import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Post, Type} from '@nestjs/common';
import {
    ApiBody,
    ApiExtraModels,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam
} from '@nestjs/swagger';

interface ScaUpdateValidateOptions<
    TBody extends object,
    TResponse extends ScaEntity
> {
    bodyDto: Type<TBody>;

    responseDto: Type<TResponse>;

    paramId?: string;

    decorators?: () => Array<MethodDecorator>;
}

export function ScaUpdateValidate<
    TBody extends object,
    TResponse extends ScaEntity
>({
    bodyDto,
    responseDto,
    paramId = 'id',
    decorators: decoratorsFn
}: ScaUpdateValidateOptions<TBody, TResponse>) {
    const name = toHumanUtils(responseDto.name);
    const decorators: Array<MethodDecorator> = [
        Post(`validates/:${paramId}`),
        ApiParam({
            name: paramId,
            type: Number,
            required: true,
            description: `The ID of a ${name}`
        }),
        ApiOperation({summary: `Validates updating a ${name} by ${paramId}`}),
        ApiBody({type: bodyDto}),
        ApiExtraModels(bodyDto, responseDto),
        ApiOkResponse({
            description: `Return a ${name} by ${paramId}`,
            type: responseDto
        }),
        ApiNotFoundResponse({
            description: `A ${name} with the specified ${paramId} was not found`
        }),
        ScaExceptionFilter(),
        ScaValidateResponse(responseDto),
        ...(decoratorsFn?.() ?? [])
    ];
    return applyDecorators(...decorators);
}

export type ScaUpdateValidateResponse<T extends ScaEntity> = Promise<T>;
