import {ProjectStorageDto} from '@/projects/dtos/project-storage.dto';
import {ApiProperty} from '@nestjs/swagger';
import {IsObject, IsOptional, IsString, IsUUID} from 'class-validator';

export class ProjectInstanceDto {
    @IsString()
    @IsUUID()
    @ApiProperty({
        description: 'ID of the project in memory'
    })
    id: string;

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
