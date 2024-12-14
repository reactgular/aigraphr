import {ScaResponseVoid} from '@/scaffold/decorators/sca-response-void';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Delete, Type} from '@nestjs/common';
import {
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam
} from '@nestjs/swagger';

interface ScaRemoveOptions<T extends ScaEntity> {
    dto: Type<T>;

    paramId?: string;

    decorators?: () => Array<MethodDecorator>;
}

export function ScaRemove<T extends ScaEntity>({
    dto,
    paramId = 'id',
    decorators: decoratorsFn
}: ScaRemoveOptions<T>) {
    const name = toHumanUtils(dto.name);
    const decorators: Array<MethodDecorator> = [
        Delete(`:${paramId}`),
        ApiParam({
            name: paramId,
            type: Number,
            required: true,
            description: `The ID of a ${name}`
        }),
        ApiOperation({summary: `Delete a ${name} by ${paramId}`}),
        ApiNotFoundResponse({
            description: `A ${name} with the specified ${paramId} was not found`
        }),
        ApiNoContentResponse({description: `The ${name} has been deleted`}),
        ScaResponseVoid(),
        ...(decoratorsFn?.() ?? [])
    ];
    return applyDecorators(...decorators);
}

export type ScaRemoveResponse = Promise<void>;
