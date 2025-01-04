import {EdgeEntity} from '@/projects/entities/edge.entity';
import {WorkspaceEntity} from '@/projects/entities/workspace.entity';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiProperty, ApiSchema, OmitType, PartialType} from '@nestjs/swagger';
import {
    IsNumber,
    IsString,
    Matches,
    MaxLength,
    Min,
    MinLength
} from 'class-validator';
import {Column, Entity, Index, ManyToOne, OneToMany} from 'typeorm';

@ApiSchema({
    description:
        'Nodes store the run-time data needed by Node Instances to run. They are connected by Edges to form a graph.'
})
@Entity({name: 'nodes'})
@Index(['workspaceId', 'name'], {unique: true})
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

    @IsString()
    @Matches(/^[a-zA-Z0-9-_]+$/, {
        message: 'The name of the node must be alphanumeric'
    })
    @MinLength(1)
    @MaxLength(128)
    @ApiProperty({
        description: 'The name of the node (alphanumeric)',
        example: 'forEach1'
    })
    @Column({length: 128})
    name: string;

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
    @Matches(/^[a-zA-Z0-9]+:[a-zA-Z0-9]+$/, {
        message:
            'The name of the node must be in the format alphanumeric:alphanumeric'
    })
    @ApiProperty({
        description: 'The namespace of the node definition'
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

export class NodeDto extends OmitType(NodeEntity, [] as const) {}

/**
 * @deprecated need to switch to using groups
 */
export class NodeCreateDto extends OmitType(NodeDto, [
    'id',
    'workspace',
    'inputEdges',
    'outputEdges'
] as const) {}

/**
 * @deprecated need to switch to using groups
 */
export class NodeUpdateDto extends PartialType(
    OmitType(NodeDto, ['id', 'workspace', 'inputEdges', 'outputEdges'] as const)
) {}
