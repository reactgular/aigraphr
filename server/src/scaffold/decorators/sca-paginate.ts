import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanEntity} from '@/scaffold/utils/to-human.entity';
import {applyDecorators, Get, Type} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from '@nestjs/swagger';

export function ScaPaginate<T extends ScaEntity>(dto: Type<T>) {
    const name = toHumanEntity(dto);
    const decorators: Array<MethodDecorator> = [
        Get(),
        ApiOperation({summary: `Paginate ${name}`}),
        ApiOkResponse({
            description: `Return a list of ${name}`,
            type: dto
        }),
        ScaValidateResponse([dto])
    ];
    return applyDecorators(...decorators);
}

export type ScaPaginateResponse<T extends ScaEntity> = Promise<Array<T>>;
