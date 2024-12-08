import {applyDecorators} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {IsIn, IsOptional, IsString} from 'class-validator';

export function IsKeyOf<TType>(
    keys: Array<keyof TType>,
    required: boolean = true
) {
    const decorators = [
        IsString(),
        IsIn(keys),
        ApiProperty({
            type: String,
            enum: keys,
            required
        })
    ];
    if (!required) {
        decorators.push(IsOptional());
    }
    return applyDecorators(...decorators);
}
