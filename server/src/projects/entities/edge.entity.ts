import {NodeEntity} from '@/projects/entities/node.entity';
import {WorkspaceEntity} from '@/projects/entities/workspace.entity';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiProperty, ApiSchema, OmitType, PartialType} from '@nestjs/swagger';
import {IsNumber, Min} from 'class-validator';
import {Column, Entity, ManyToOne} from 'typeorm';

@ApiSchema({
    description:
        'Edges connect nodes in a workspace. They are used to define the flow of data between nodes.'
})
@Entity({name: 'edges'})
export class EdgeEntity extends ScaEntity {
    @ApiProperty({
        type: () => NodeEntity,
        description: 'The node that the edge connects to as an input',
        required: false,
        example: {
            id: 1,
            workspaceId: 1,
            inputEdges: [],
            outputEdges: []
        }
    })
    @ManyToOne(() => NodeEntity, (node) => node.outputEdges, {
        onDelete: 'CASCADE'
    })
    inputNode: NodeEntity;

    @ApiProperty({
        description: 'The ID of the node that the edge connects to as an input',
        example: 1
    })
    @IsNumber()
    @Min(1)
    @Column()
    inputNodeId: number;

    @ApiProperty({
        type: () => NodeEntity,
        description: 'The node that the edge connects to as an output',
        required: false,
        example: {
            id: 1,
            workspaceId: 1,
            inputEdges: [],
            outputEdges: []
        }
    })
    @ManyToOne(() => NodeEntity, (node) => node.inputEdges, {
        onDelete: 'CASCADE'
    })
    outputNode: NodeEntity;

    @ApiProperty({
        description:
            'The ID of the node that the edge connects to as an output',
        example: 1
    })
    @IsNumber()
    @Min(1)
    @Column()
    outputNodeId: number;

    @ApiProperty({
        type: () => WorkspaceEntity,
        description: 'The workspace of the edge',
        required: false,
        example: {id: 1}
    })
    @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.edges, {
        onDelete: 'CASCADE'
    })
    workspace: WorkspaceEntity;

    @ApiProperty({
        description: 'The ID of the workspace of the node',
        example: 1
    })
    @IsNumber()
    @Min(1)
    @Column()
    workspaceId: number;
}

export class EdgeDto extends OmitType(EdgeEntity, [] as const) {}

/**
 * @deprecated need to switch to using groups
 */
export class EdgeCreateDto extends OmitType(EdgeDto, [
    'id',
    'workspace'
] as const) {}

/**
 * @deprecated need to switch to using groups
 */
export class EdgeUpdateDto extends PartialType(
    OmitType(EdgeDto, ['id', 'workspace', 'workspaceId'] as const)
) {}
