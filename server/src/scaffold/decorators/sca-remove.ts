import {ScaResponseVoid} from '@/scaffold/decorators/sca-response-void';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {toHumanEntity} from '@/scaffold/utils/to-human.entity';
import {applyDecorators, Delete, Type} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';

export function ScaRemove<T extends ScaEntity>(dto: Type<T>) {
    const name = toHumanEntity(dto);
    const decorators: Array<MethodDecorator> = [
        Delete(':id'),
        ApiOperation({summary: `Delete a ${name} by ID`}),
        ScaResponseVoid()
    ];
    return applyDecorators(...decorators);
}

export type ScaRemoveResponse = Promise<void>;
