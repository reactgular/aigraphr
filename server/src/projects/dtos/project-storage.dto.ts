import {ApiProperty} from '@nestjs/swagger';
import {IsDate, IsString} from 'class-validator';

export class ProjectStorageDto {
    @IsString()
    @ApiProperty({
        description: 'The unique identifier of the project storage',
        example:
            '344feee1cda9f0d3b68d14cb0586e948c72bad81f96a8fba4311376b62545dde'
    })
    id: string;

    @IsString()
    @ApiProperty({
        example: 'example-project.aigraphr'
    })
    fileName: string;

    @IsDate()
    @ApiProperty()
    createdAt: Date;
}
