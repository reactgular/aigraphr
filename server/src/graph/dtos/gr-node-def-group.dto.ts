import {GrNodeDefDto} from '@/graph/dtos/gr-node-def.dto';
import {ApiProperty, ApiSchema} from '@nestjs/swagger';
import {IsString} from 'class-validator';

@ApiSchema({
    description:
        'Describes how nodes are structured. It is used to generate the UI for the node.'
})
export class GrNodeDefGroupDto {
    @IsString()
    @ApiProperty({
        description: 'The description of the group',
        example: 'Core nodes'
    })
    description: string;

    @IsString()
    @ApiProperty({
        description: 'The name of the group',
        example: 'core'
    })
    name: string;

    @ApiProperty({
        description: 'The nodes in the group',
        type: GrNodeDefDto,
        isArray: true
    })
    nodes: GrNodeDefDto[];
}
