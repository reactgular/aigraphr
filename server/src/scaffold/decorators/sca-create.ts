import {ScaExceptionFilter} from '@/scaffold/decorators/sca-exception-filter';
import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, HttpCode, Post, Type} from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation
} from '@nestjs/swagger';

interface ScaCreateOptions<TBody extends object, TResponse extends ScaEntity> {
    bodyDto: Type<TBody>;

    responseDto: Type<TResponse>;

    decorators?: () => Array<MethodDecorator>;
}

export function ScaCreate<TBody extends object, TResponse extends ScaEntity>({
    bodyDto,
    responseDto,
    decorators: decoratorsFn
}: ScaCreateOptions<TBody, TResponse>) {
    const name = toHumanUtils(responseDto.name);
    const decorators: Array<MethodDecorator> = [
        Post(),
        HttpCode(201),
        ApiOperation({summary: `Create a new ${name}`}),
        ApiBody({type: bodyDto}),
        ApiExtraModels(bodyDto, responseDto),
        // TODO: Bug, can't disable 200 response from custom decorator
        ApiOkResponse({
            description: `Bug, can't disable 200 response from custom decorator`
        }),
        ApiCreatedResponse({
            description: `Return a new ${name}`,
            type: responseDto
        }),
        ScaValidateResponse(responseDto),
        ...ScaExceptionFilter(),
        ...(decoratorsFn?.() ?? [])
    ];
    return applyDecorators(...decorators);
}

export type ScaCreateResponse<T extends ScaEntity> = Promise<T>;
