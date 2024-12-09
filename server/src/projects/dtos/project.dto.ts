import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsDate, IsString} from 'class-validator';

export class ProjectDto {
    @IsString()
    @ApiProperty({
        example: 'example-project.aigraphr'
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

    @IsBoolean()
    @ApiProperty()
    opened: boolean;
}
