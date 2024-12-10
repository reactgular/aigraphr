import {IsProfileName} from '@/projects/decorators/is-profile-name.decorator';
import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsDate, IsNumber, Min} from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity({name: 'projects'})
export class ProjectEntity {
    @IsNumber()
    @Min(1)
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsProfileName()
    @Column()
    name: string;

    @IsDate()
    @ApiProperty()
    @CreateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP(6)'
    })
    public createdAt: Date;

    @IsDate()
    @ApiProperty()
    @UpdateDateColumn({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
    public updatedAt: Date;

    @IsBoolean()
    @ApiProperty({
        description: 'The open status of the project'
    })
    @Column({default: false})
    open: boolean;
}
