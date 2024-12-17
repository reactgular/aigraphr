import {EdgeEntity} from '@/projects/entities/edge.entity';
import {NodeEntity} from '@/projects/entities/node.entity';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {
    ApiProperty,
    ApiPropertyOptional,
    ApiSchema,
    OmitType,
    PartialType
} from '@nestjs/swagger';
import {
    IsEnum,
    IsOptional,
    IsString,
    MaxLength,
    MinLength
} from 'class-validator';
import {Column, Entity, OneToMany} from 'typeorm';

export enum WorkspaceEngine {
    JAVASCRIPT = 'javascript',
    PYTHON = 'python'
}

@ApiSchema({
    description:
        'Workspaces are the top level of the project hierarchy, and contain the nodes that make up an executable graph.'
})
@Entity({name: 'workspaces'})
export class WorkspaceEntity extends ScaEntity {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: 'string',
        description: 'Description of the workspace',
        nullable: true
    })
    @Column({type: 'text', nullable: true})
    description?: string | null;

    @ApiProperty({
        type: () => EdgeEntity,
        description: 'The edges of the workspace that connect nodes',
        required: false,
        example: [{id: 1, workspaceId: 1}]
    })
    @OneToMany(() => EdgeEntity, (edge) => edge.workspace, {
        cascade: true,
        onDelete: 'CASCADE',
        eager: false
    })
    edges: EdgeEntity[];

    @IsEnum(WorkspaceEngine)
    @ApiProperty({
        description: 'The engine of the workspace',
        enum: WorkspaceEngine
    })
    @Column({type: 'text', enum: WorkspaceEngine})
    engine: WorkspaceEngine;

    @IsString()
    @MinLength(3)
    @MaxLength(128)
    @ApiProperty({
        description: 'The name of the workspace',
        example: 'main'
    })
    @Column({length: 128})
    name: string;

    @ApiProperty({
        type: () => NodeEntity,
        description: 'The nodes of the workspace',
        required: false,
        example: [{id: 1, workspaceId: 1}]
    })
    @OneToMany(() => NodeEntity, (node) => node.workspace, {
        cascade: true,
        onDelete: 'CASCADE',
        eager: false
    })
    nodes: NodeEntity[];
}

export class WorkspaceDto extends OmitType(WorkspaceEntity, [
    'edges',
    'nodes'
] as const) {}

/**
 * @deprecated need to switch to using groups
 */
export class WorkspaceCreateDto extends OmitType(WorkspaceDto, [
    'id'
] as const) {}

/**
 * @deprecated need to switch to using groups
 */
export class WorkspaceUpdateDto extends PartialType(
    OmitType(WorkspaceDto, ['id', 'engine'] as const)
) {}
