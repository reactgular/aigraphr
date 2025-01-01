import {ApiProperty, ApiSchema} from '@nestjs/swagger';
import {IsBoolean, IsEnum, IsString} from 'class-validator';

export enum GrParamType {
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
        enum: GrParamType
    })
    type: GrParamType;
}
