import {IsProfileName} from '@/projects/decorators/is-profile-name.decorator';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {OmitType, PartialType} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {Column, Entity} from 'typeorm';

@Entity({name: 'workspaces'})
export class WorkspaceEntity extends ScaEntity {
    // TODO: Just reusing this for now for testing
    @IsProfileName()
    @Column()
    name: string;

    @IsString()
    @Column()
    test: string;
}

export class WorkspaceDto extends OmitType(WorkspaceEntity, [] as const) {}

export class WorkspaceCreateDto extends OmitType(WorkspaceDto, [
    'id'
] as const) {}

export class WorkspaceUpdateDto extends PartialType(
    OmitType(WorkspaceDto, ['id'] as const)
) {}
