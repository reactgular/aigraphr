import {ScaExceptionFilterDto} from '@/scaffold/dtos/sca-exception-filter.dto';
import {ApiBadRequestResponse, ApiConflictResponse} from '@nestjs/swagger';

export function ScaExceptions(): Array<MethodDecorator> {
    return [
        ApiBadRequestResponse({
            type: ScaExceptionFilterDto,
            description: 'TypeORM related errors',
            example: {
                statusCode: 400,
                message: 'property should not be empty',
                path: '/api/v1/users'
            } satisfies ScaExceptionFilterDto
        }),
        ApiConflictResponse({
            type: ScaExceptionFilterDto,
            description: 'TypeORM related constraint errors',
            example: {
                statusCode: 409,
                message: 'duplicate key value violates unique constraint',
                path: '/api/v1/users'
            } satisfies ScaExceptionFilterDto
        })
    ];
}
