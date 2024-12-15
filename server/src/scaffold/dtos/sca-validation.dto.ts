import {ApiExtraModels, ApiProperty, getSchemaPath} from '@nestjs/swagger';

export enum ScaFieldValidationCode {
    NOT_FOUND = 'not_found',
    NOT_UNIQUE = 'not_unique',
    FORMAT = 'format',
    BAD_VALUE = 'bad_value',
    INVALID = 'invalid'
}

export class ScaFieldValidationDto {
    @ApiProperty({
        description: 'The name of the field being validated.'
    })
    name: string;

    @ApiProperty({
        description: 'The code of the validation.',
        example: ScaFieldValidationCode.FORMAT,
        enum: ScaFieldValidationCode
    })
    code: ScaFieldValidationCode;

    @ApiProperty({
        description:
            'A message providing additional details about the validation.',
        example: 'The email is not valid.'
    })
    message: string;
}

@ApiExtraModels(ScaFieldValidationDto)
export class ScaValidationResponseDto {
    @ApiProperty({
        description: 'Whether the validation was successful.',
        example: false
    })
    valid: boolean;

    @ApiProperty({
        description: 'The list of fields that failed validation.',
        example: ['name', 'email'],
        type: 'array',
        items: {
            type: 'string'
        }
    })
    fields: string[];

    @ApiProperty({
        description: 'Validation results for each field.',
        example: {
            name: {
                name: 'name',
                message: 'The name is already taken.'
            },
            email: {
                name: 'email',
                message: 'The email is not valid.'
            }
        },
        type: 'object', // Explicitly mark it as an object for Swagger
        additionalProperties: {
            type: 'object',
            $ref: getSchemaPath(ScaFieldValidationDto)
        }
    })
    invalidations: Record<string, ScaFieldValidationDto>;
}
