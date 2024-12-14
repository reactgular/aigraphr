import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Get, Type} from '@nestjs/common';
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation
} from '@nestjs/swagger';

export function ScaGet<T extends ScaEntity>(
    dto: Type<T>,
    paramId: string = 'id'
) {
    const name = toHumanUtils(dto.name);
    const decorators: Array<MethodDecorator> = [
        Get(`:${paramId}`),
        ApiOperation({summary: `Get ${name} by ${paramId}`}),
        ApiOkResponse({
            description: `Return a ${name} by ${paramId}`,
            type: dto
        }),
        ApiNotFoundResponse({
            description: `A ${name} with the specified ${paramId} was not found`
        }),
        ScaValidateResponse(dto)
    ];
    return applyDecorators(...decorators);
}

export type ScaGetResponse<T extends ScaEntity> = Promise<T>;
