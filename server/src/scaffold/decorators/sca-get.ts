import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Get, Type} from '@nestjs/common';
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam
} from '@nestjs/swagger';

interface ScaGetOptions<T extends ScaEntity> {
    decorators?: () => Array<MethodDecorator>;
    dto: Type<T>;
    paramId?: string;
}

export function ScaGet<T extends ScaEntity>({
    dto,
    paramId = 'id',
    decorators: decoratorsFn
}: ScaGetOptions<T>) {
    const name = toHumanUtils(dto.name);
    const decorators: Array<MethodDecorator> = [
        Get(`:${paramId}`),
        ApiParam({
            name: paramId,
            type: Number,
            required: true,
            description: `The ID of a ${name}`
        }),
        ApiOperation({summary: `Get ${name} by ${paramId}`}),
        ApiOkResponse({
            description: `Return a ${name} by ${paramId}`,
            type: dto
        }),
        ApiNotFoundResponse({
            description: `A ${name} with the specified ${paramId} was not found`
        }),
        ScaValidateResponse(dto),
        ...(decoratorsFn?.() ?? [])
    ];
    return applyDecorators(...decorators);
}

export type ScaGetResponse<T extends ScaEntity> = Promise<T>;
