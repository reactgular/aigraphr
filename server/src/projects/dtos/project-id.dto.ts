import {ScaffoldIdDto} from '@/scaffold/dtos/scaffold-id.dto';
import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, Min} from 'class-validator';

export class ProjectIdDto extends ScaffoldIdDto {
    @IsNumber()
    @Min(1)
    @ApiProperty()
    projectId: number;
}
