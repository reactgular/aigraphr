import {ExceptionFilterDto} from '@/filters/exception-filter.dto';
import {ApiBadRequestResponse} from '@nestjs/swagger';

export function ScaExceptionFilter() {
    return ApiBadRequestResponse({
        type: ExceptionFilterDto,
        description: 'TypeORM related errors',
        example: {
            statusCode: 400,
            message: 'property should not be empty',
            path: '/api/v1/users'
        } satisfies ExceptionFilterDto
    });
}
