import {ProjectStorageDto} from '@/projects/dtos/project-storage.dto';
import {ApiProperty} from '@nestjs/swagger';
import {IsObject, IsOptional, IsString, IsUUID} from 'class-validator';

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

    @IsString()
    @ApiProperty({
        description: 'ID of the project storage',
        example:
            '344feee1cda9f0d3b68d14cb0586e948c72bad81f96a8fba4311376b62545dde'
    })
    storageId: string;

    @IsObject()
    @IsOptional()
    @ApiProperty({
        description: 'Project storage',
        required: false
    })
    storage?: ProjectStorageDto;
}
