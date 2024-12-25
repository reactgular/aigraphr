import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, Min} from 'class-validator';

export class ScaIdDto {
    @IsNumber()
    @Min(1)
    @ApiProperty()
    id: number;
}
