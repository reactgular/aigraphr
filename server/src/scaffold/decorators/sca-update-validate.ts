import {ExceptionFilterDto} from '@/filters/exception-filter.dto';
import {ScaValidationResponseDto} from '@/scaffold/dtos/sca-validation.dto';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Patch, Type} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiExtraModels,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam
} from '@nestjs/swagger';

interface ScaUpdateValidateOptions<TBody extends object> {
    bodyDto: Type<TBody>;

    paramId?: string;

    decorators?: () => Array<MethodDecorator>;
}

export function ScaUpdateValidate<TBody extends object>({
    bodyDto,
    paramId = 'id',
    decorators: decoratorsFn
}: ScaUpdateValidateOptions<TBody>) {
    const name = toHumanUtils(bodyDto.name);
    const decorators: Array<MethodDecorator> = [
        Patch(`:${paramId}/validates`),
        ApiParam({
            name: paramId,
            type: Number,
            required: true,
            description: `The ID of a ${name}`
        }),
        ApiOperation({summary: `Validates updating a ${name} by ${paramId}`}),
        ApiBody({type: bodyDto}),
        ApiExtraModels(bodyDto, ScaValidationResponseDto),
        ApiOkResponse({
            type: ScaValidationResponseDto,
            description: `Validation results of ${name}`
        }),
        ApiBadRequestResponse({
            type: ExceptionFilterDto,
            description: 'Invalid request body',
            example: {
                statusCode: 400,
                message: 'property should not be empty',
                path: '/api/v1/users'
            } satisfies ExceptionFilterDto
        }),
        ApiNotFoundResponse({
            description: `A ${name} with the specified ${paramId} was not found`
        }),
        ...(decoratorsFn?.() ?? [])
    ];
    return applyDecorators(...decorators);
}

export type ScaUpdateValidateResponse<T extends ScaEntity> = Promise<T>;
