import {ProjectInstanceDto} from '@/projects/_deprecated/dtos/project-instance.dto';
import {IsProfileName} from '@/projects/decorators/is-profile-name.decorator';
import {ApiProperty} from '@nestjs/swagger';
import {
    IsDate,
    IsNumber,
    IsObject,
    IsOptional,
    IsString
} from 'class-validator';

/**
 * @deprecated
 */
export class ProjectFileDto {
    @IsString()
    @ApiProperty({
        description: 'The unique identifier of the project file',
        example:
            '344feee1cda9f0d3b68d14cb0586e948c72bad81f96a8fba4311376b62545dde'
    })
    id: string;

    @IsProfileName()
    name: string;

    @IsString()
    @ApiProperty({
        description: 'The name of the project file',
        example: 'example-project.aigraphr'
    })
    fileName: string;

    @IsNumber()
    @ApiProperty({
        description: 'The size of the project file in bytes',
        example: 1024
    })
    size: number;

    @IsString()
    @ApiProperty({
        description: 'The folder where the project file is stored',
        example: '/path/to'
    })
    folder: string;

    @IsString()
    @ApiProperty({
        description: 'The path to the project file',
        example: '/path/to/example-project.aigraphr'
    })
    path: string;

    @IsDate()
    @ApiProperty()
    createdAt: Date;
}

export class ProjectFileWithInstanceDto extends ProjectFileDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The unique identifier of the project instance',
        example: '344feee1cda9f0d3b68d14cb0586e94',
        required: false
    })
    instanceId?: string;

    @IsObject()
    @IsOptional()
    @ApiProperty({
        description: 'Project instance'
    })
    instance?: ProjectInstanceDto;
}