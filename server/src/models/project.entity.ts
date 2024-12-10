import {IsProfileName} from '@/projects/decorators/is-profile-name.decorator';
import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsNumber, Min} from 'class-validator';
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

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

    @Column()
    test: string;

    @IsBoolean()
    @ApiProperty({
        description: 'The open status of the project'
    })
    @Column({default: false})
    open: boolean;
}
