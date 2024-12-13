import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, Min} from 'class-validator';
import {PrimaryGeneratedColumn} from 'typeorm';

export abstract class ScaEntity {
    @IsNumber()
    @Min(1)
    @ApiProperty({example: 1234})
    @PrimaryGeneratedColumn()
    id: number;
}
