import {ApiProperty, ApiSchema} from '@nestjs/swagger';
import {IsBoolean, IsNumber, IsString} from 'class-validator';
import {GrNodeDefParamDto} from './gr-node-def-param.dto';

export enum GrNodeDefIcon {
    CORE = 'core',
    CUSTOM = 'custom',
    FILE = 'file',
    IMAGE = 'image',
    MATH = 'math',
    NETWORK = 'network',
    OTHER = 'other',
    SOCIAL = 'social',
    TEXT = 'text',
    TIME = 'time',
    WEB = 'web'
}

@ApiSchema({
    description:
        'Describes how nodes are structured. It is used to generate the UI for the node.'
})
export class GrNodeDefDto {
    @IsBoolean()
    @ApiProperty({
        description: 'Whether the node is deprecated',
        example: false,
        required: false
    })
    deprecated?: boolean;

    @IsString()
    @ApiProperty({
        description: 'The description of the node',
        example: 'Iterates over a list of items'
    })
    description: string;

    @IsString()
    @ApiProperty({
        description: 'The group of the node',
        example: 'core'
    })
    group: string;

    @IsString()
    @ApiProperty({
        description: 'The icon of the node',
        example: GrNodeDefIcon.CORE,
        enum: GrNodeDefIcon
    })
    icon: GrNodeDefIcon;

    @ApiProperty({
        description: 'The inputs of the node',
        type: GrNodeDefParamDto,
        isArray: true
    })
    inputs: GrNodeDefParamDto[];

    @ApiProperty({
        description: 'The outputs of the node',
        type: GrNodeDefParamDto,
        isArray: true
    })
    outputs: GrNodeDefParamDto[];

    @IsString()
    @ApiProperty({
        description: 'The unique type of the node',
        example: 'forEach'
    })
    type: string;

    @IsNumber()
    @ApiProperty({
        description: 'The version of the node',
        example: 1
    })
    version: number;
}
