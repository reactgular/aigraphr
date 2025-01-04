import {GrNodeDto} from '@/graph/dtos/gr-node.dto';
import {ApiProperty, ApiSchema} from '@nestjs/swagger';
import {IsString} from 'class-validator';

@ApiSchema({
    description:
        'Describes how nodes are structured. It is used to generate the UI for the node.'
})
export class GrGroupDto {
    @IsString()
    @ApiProperty({
        description: 'The description of the group'
    })
    description: string;

    @ApiProperty({
        description: 'The nodes in the group',
        type: GrNodeDto,
        isArray: true
    })
    grNodes?: GrNodeDto[];

    @IsString()
    @ApiProperty({
        description: 'The name of the group',
        example: 'core'
    })
    name: string;

    @IsString()
    @ApiProperty({
        description: 'The types of nodes in the group',
        isArray: true
    })
    types: string[];
}
