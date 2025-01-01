import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiProperty, ApiSchema} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {GrParamDto} from './gr-param.dto';

@ApiSchema({
    description:
        'Describes how nodes are structured. It is used to generate the UI for the node.'
})
export class GrNodeDto extends ScaEntity {
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
}
