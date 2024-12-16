import {NodeEntity} from '@/projects/entities/node.entity';
import {WorkspaceEntity} from '@/projects/entities/workspace.entity';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {ApiProperty, ApiSchema, OmitType, PartialType} from '@nestjs/swagger';
import {Entity, ManyToOne} from 'typeorm';

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
        type: () => WorkspaceEntity,
        description: 'The workspace of the edge',
        required: false,
        example: {id: 1}
    })
    @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.edges, {
        onDelete: 'CASCADE'
    })
    workspace: WorkspaceEntity;
}

export class EdgeDto extends OmitType(EdgeEntity, [] as const) {}

/**
 * @deprecated need to switch to using groups
 */
export class EdgeCreateDto extends OmitType(EdgeDto, ['id'] as const) {}

/**
 * @deprecated need to switch to using groups
 */
export class EdgeUpdateDto extends PartialType(
    OmitType(EdgeDto, ['id'] as const)
) {}
