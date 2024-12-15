import {ApiExtraModels, ApiProperty, getSchemaPath} from '@nestjs/swagger';

export class ScaFieldValidationDto {
    @ApiProperty({
        description: 'The name of the field being validated.'
    })
    name: string;

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
        description: 'The list of fields that failed validation.',
        example: ['name', 'email'],
        type: 'array',
        items: {
            type: 'string'
        }
    })
    invalidationProps: string[];

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
