import {ProjectFileDto} from '@/projects/_deprecated/dtos/project-file.dto';
import {ApiProperty} from '@nestjs/swagger';
import {IsObject, IsOptional, IsString, IsUUID} from 'class-validator';

/**
 * @deprecated
 */
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
        description: 'The unique identifier of the project file',
        example:
            '344feee1cda9f0d3b68d14cb0586e948c72bad81f96a8fba4311376b62545dde'
    })
    fileId: string;

    @IsString()
    @ApiProperty({
        description: 'Name of the project',
        example: 'My project'
    })
    name: string;
}

/**
 * @deprecated
 */
export class ProjectInstanceWithFileDto extends ProjectInstanceDto {
    @IsObject()
    @IsOptional()
    @ApiProperty({
        description: 'Project file',
        required: false
    })
    file: ProjectFileDto;
}
