import {applyDecorators} from '@nestjs/common';
import {ApiProperty} from '@nestjs/swagger';
import {
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength
} from 'class-validator';

export const PROFILE_FILE_REGEX = /^[a-zA-Z0-9-_]+$/;

export function IsProfileName(required: boolean = true) {
    const decorators = [
        IsString(),
        Matches(PROFILE_FILE_REGEX, {
            message: 'The name of the project must be alphanumeric'
        }),
        MinLength(3),
        MaxLength(50),
        ApiProperty({
            description: 'The name of the project (alphanumeric)',
            example: 'example-project'
        })
    ];
    if (!required) {
        decorators.push(IsOptional());
    }
    return applyDecorators(...decorators);
}
