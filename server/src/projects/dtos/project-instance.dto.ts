import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsUUID} from 'class-validator';

export class ProjectInstanceDto {
    @IsString()
    @IsUUID()
    @ApiProperty({
        description: 'ID of the project in memory',
        example: '344feee-1cda-9f0d-3b68-d14cb0586e94'
    })
    id: string;

    @IsString()
    @ApiProperty({
        description: 'Name of the project',
        example: 'My project'
    })
    name: string;
}
