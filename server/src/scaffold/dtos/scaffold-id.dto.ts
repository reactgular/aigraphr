import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, Min} from 'class-validator';
import {PrimaryGeneratedColumn} from 'typeorm';

export class ScaffoldIdDto {
    @IsNumber()
    @Min(1)
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
}
