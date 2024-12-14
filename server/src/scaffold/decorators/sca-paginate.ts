import {ScaValidateResponse} from '@/scaffold/decorators/sca-validate-response';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Get, Type} from '@nestjs/common';
import {ApiOkResponse, ApiOperation} from '@nestjs/swagger';

export function ScaPaginate<T extends ScaEntity>(dto: Type<T>) {
    const name = toHumanUtils(dto.name);
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
