import {ScaResponseVoid} from '@/scaffold/decorators/sca-response-void';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Delete, Type} from '@nestjs/common';
import {
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOperation
} from '@nestjs/swagger';

export function ScaRemove<T extends ScaEntity>(dto: Type<T>) {
    const name = toHumanUtils(dto.name);
    const decorators: Array<MethodDecorator> = [
        Delete(':id'),
        ApiOperation({summary: `Delete a ${name} by ID`}),
        ApiNotFoundResponse({
            description: `A ${name} with the specified ID was not found`
        }),
        ApiNoContentResponse({description: `The ${name} has been deleted`}),
        ScaResponseVoid()
    ];
    return applyDecorators(...decorators);
}

export type ScaRemoveResponse = Promise<void>;
