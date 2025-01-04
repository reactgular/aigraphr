import {ApiProperty, ApiSchema} from '@nestjs/swagger';
import {IsBoolean, IsNumber, IsString} from 'class-validator';
import {GrParamDto} from './gr-param.dto';

@ApiSchema({
    description:
        'Describes how nodes are structured. It is used to generate the UI for the node.'
})
export class GrNodeDto {
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

    @ApiProperty({
        description: 'The inputs of the node',
        type: GrParamDto,
        isArray: true
    })
    inputs: GrParamDto[];

    @ApiProperty({
        description: 'The outputs of the node',
        type: GrParamDto,
        isArray: true
    })
    outputs: GrParamDto[];

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
