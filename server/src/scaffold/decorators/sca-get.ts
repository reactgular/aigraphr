import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanEntity} from '@/scaffold/utils/to-human.entity';
import {applyDecorators, Get, Type} from '@nestjs/common';
import {
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation
} from '@nestjs/swagger';

export function ScaGet<T extends ScaEntity>(dto: Type<T>) {
    const name = toHumanEntity(dto);
    const decorators: Array<MethodDecorator> = [
        Get(':id'),
        ApiOperation({summary: `Get ${name} by ID`}),
        ApiOkResponse({
            description: `Return a ${name} by ID`,
            type: dto
        }),
        ApiNotFoundResponse({
            description: `A ${name} with the specified ID was not found`
        }),
        ScaValidateResponse(dto)
    ];
    return applyDecorators(...decorators);
}

export type ScaGetResponse<T extends ScaEntity> = Promise<T>;
