import {ApiProperty} from '@nestjs/swagger';

export class ScaExceptionFilterDto {
    @ApiProperty({
        description: 'The HTTP status code of the error.',
        example: 400
    })
    statusCode: number;

    @ApiProperty({
        description: 'Extra information about the error.'
    })
    cause?: object;

    @ApiProperty({
        description: 'The error message.',
        example: 'Bad Request'
    })
    message: string;

    @ApiProperty({
        description: 'The path of the request that caused the error.',
        example: '/api/v1/users'
    })
    path: string;

    @ApiProperty({
        description: 'The stack trace of the error.',
        example: ['Error: Bad Request', '    at ...']
    })
    stack?: Array<string>;
}
