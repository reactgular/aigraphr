import {ScaResponseVoid} from '@/scaffold/decorators/sca-response-void';
import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {toHumanUtils} from '@/scaffold/utils/to-human.utils';
import {applyDecorators, Delete, Type} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';

export function ScaRemove<T extends ScaffoldEntity>(dto: Type<T>) {
    const name = toHumanUtils(dto);
    const decorators: Array<MethodDecorator> = [
        Delete(':id'),
        ApiOperation({summary: `Delete a ${name} by ID`}),
        ScaResponseVoid()
    ];
    return applyDecorators(...decorators);
}

export type ScaRemoveResponse = Promise<void>;
