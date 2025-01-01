import {ApiProperty, ApiSchema} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {NodeParamDto} from './node-param.dto';

@ApiSchema({
    description:
        'NodeDesc describe how nodes are structured in the workspace. It is used to generate the UI for the node.'
})
export class NodeDescDto {
    @ApiProperty({
        description: 'The inputs of the node',
        type: NodeParamDto,
        isArray: true
    })
    inputs: NodeParamDto[];

    @ApiProperty({
        description: 'The outputs of the node',
        type: NodeParamDto,
        isArray: true
    })
    outputs: NodeParamDto[];

    @IsString()
    @ApiProperty({
        description: 'The unique type of the node',
        example: 'forEach'
    })
    type: string;
}
