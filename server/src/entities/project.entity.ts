import {IsProfileName} from '@/projects/decorators/is-profile-name.decorator';
import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {ApiProperty, OmitType} from '@nestjs/swagger';
import {IsBoolean} from 'class-validator';
import {Column, Entity} from 'typeorm';

@Entity({name: 'projects'})
export class ProjectEntity extends ScaffoldEntity {
    @IsProfileName()
    @Column()
    name: string;

    @Column()
    test: string;

    @IsBoolean()
    @ApiProperty({
        description: 'The open status of the project'
    })
    @Column({default: false})
    open: boolean;
}

export class ProjectCreateEntity extends OmitType(ProjectEntity, [
    'id'
] as const) {}
