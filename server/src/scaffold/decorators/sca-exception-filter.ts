import {ExceptionFilterDto} from '@/filters/exception-filter.dto';
import {ApiBadRequestResponse, ApiConflictResponse} from '@nestjs/swagger';

export function ScaExceptionFilter(): Array<MethodDecorator> {
    return [
        ApiBadRequestResponse({
            type: ExceptionFilterDto,
            description: 'TypeORM related errors',
            example: {
                statusCode: 400,
                message: 'property should not be empty',
                path: '/api/v1/users'
            } satisfies ExceptionFilterDto
        }),
        ApiConflictResponse({
            type: ExceptionFilterDto,
            description: 'TypeORM related constraint errors',
            example: {
                statusCode: 409,
                message: 'duplicate key value violates unique constraint',
                path: '/api/v1/users'
            } satisfies ExceptionFilterDto
        })
    ];
}
