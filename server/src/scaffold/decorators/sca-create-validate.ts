import {ExceptionFilterDto} from '@/filters/exception-filter.dto';
import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaValidationResponseDto} from '@/scaffold/dtos/sca-validation.dto';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, HttpCode, Post, Type} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation
} from '@nestjs/swagger';

interface ScaCreateValidateOptions<TBody extends object> {
    bodyDto: Type<TBody>;

    decorators?: () => Array<MethodDecorator>;
}

export function ScaCreateValidate<TBody extends object>({
    bodyDto,
    decorators: decoratorsFn
}: ScaCreateValidateOptions<TBody>) {
    const name = toHumanUtils(bodyDto.name);
    const decorators: Array<MethodDecorator> = [
        Post('validates'),
        HttpCode(200),
        ApiOperation({summary: `Validates creation of a ${name}`}),
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
        ScaValidateResponse(ScaValidationResponseDto),
        ...(decoratorsFn?.() ?? [])
    ];
    return applyDecorators(...decorators);
}

export type ScaCreateValidateResponse = Promise<ScaValidationResponseDto>;
