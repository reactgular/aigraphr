import {NodeDescDto} from '@/projects/dtos/node-desc.dto';
import {EdgeEntity} from '@/projects/entities/edge.entity';
import {WorkspaceEntity} from '@/projects/entities/workspace.entity';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiProperty, ApiSchema, OmitType, PartialType} from '@nestjs/swagger';
import {IsNumber, IsString, Min} from 'class-validator';
import {Column, Entity, ManyToOne, OneToMany} from 'typeorm';

@ApiSchema({
    description:
        'Nodes store the run-time data needed by Node Instances to run. They are connected by Edges to form a graph.'
})
@Entity({name: 'nodes'})
export class NodeEntity extends ScaEntity {
    @ApiProperty({
        type: () => EdgeEntity,
        description: 'The edges that connect to the node as inputs',
        required: false,
        example: {id: 1, inputNodeId: 1, outputNodeId: 1}
    })
    @OneToMany(() => EdgeEntity, (edge) => edge.inputNode, {
        cascade: true,
        eager: false
    })
    inputEdges: EdgeEntity[];

    @ApiProperty({
        type: () => EdgeEntity,
        description: 'The edges that connect to the node as outputs',
        required: false,
        example: {id: 1, inputNodeId: 1, outputNodeId: 1}
    })
    @OneToMany(() => EdgeEntity, (edge) => edge.outputNode, {
        cascade: true,
        eager: false
    })
    outputEdges: EdgeEntity[];

    @IsString()
    @ApiProperty({
        description: 'The type of the node',
        example: 'forEach'
    })
    @Column()
    type: string;

    @ApiProperty({
        type: () => WorkspaceEntity,
        description: 'The workspace of the node',
        required: false,
        example: {id: 1}
    })
    @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.nodes, {
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

export class NodeDto extends OmitType(NodeEntity, [] as const) {
    @ApiProperty({
        description: 'The description of the node'
    })
    nodeDesc?: NodeDescDto;
}

/**
 * @deprecated need to switch to using groups
 */
export class NodeCreateDto extends OmitType(NodeDto, [
    'id',
    'workspace',
    'inputEdges',
    'outputEdges',
    'nodeDesc'
] as const) {}

/**
 * @deprecated need to switch to using groups
 */
export class NodeUpdateDto extends PartialType(
    OmitType(NodeDto, [
        'id',
        'workspace',
        'inputEdges',
        'outputEdges',
        'nodeDesc'
    ] as const)
) {}
