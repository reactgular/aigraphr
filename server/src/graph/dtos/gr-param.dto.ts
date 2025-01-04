import {ApiProperty, ApiSchema} from '@nestjs/swagger';
import {IsBoolean, IsEnum, IsString} from 'class-validator';

export enum GrParamType {
    /**
     * This is not a primitive type, but a type that is used to represent a user type.
     */
    UserType = 'userType',
    String = 'string',
    Number = 'number',
    Boolean = 'boolean',
    Object = 'object'
}

@ApiSchema({
    description:
        'A parameter of a node. It is used to generate the UI for the node.'
})
export class GrParamDto {
    @IsString()
    @ApiProperty({
        description: 'The description of the parameter',
        example: 'A number parameter'
    })
    description: string;

    @IsBoolean()
    @ApiProperty({
        description: 'Whether the parameter is an array',
        example: false
    })
    isArray: boolean;

    @IsString()
    @ApiProperty({
        description: 'The name of the parameter',
        example: 'count'
    })
    name: string;

    @IsEnum(GrParamType)
    @ApiProperty({
        description: 'The type of the parameter',
        example: GrParamType.Number,
        enum: GrParamType
    })
    type: GrParamType;
}
