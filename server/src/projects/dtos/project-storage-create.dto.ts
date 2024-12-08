import {ApiProperty} from '@nestjs/swagger';
import {IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class ProjectStorageCreateDto {
    @IsString()
    @Matches(/^[a-zA-Z0-9-_]+$/, {
        message: 'The name of the project must be alphanumeric'
    })
    @MinLength(3)
    @MaxLength(50)
    @ApiProperty({
        description: 'The name of the project (alphanumeric)',
        example: 'example-project'
    })
    name: string;
}
