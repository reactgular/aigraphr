import {ScaExceptionFilterDto} from '@/scaffold/dtos/sca-exception-filter.dto';
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import {EntityNotFoundError, QueryFailedError, TypeORMError} from 'typeorm';

function toJson(value: unknown): object | undefined {
    try {
        const obj =
            value === undefined || value === null
                ? undefined
                : JSON.parse(JSON.stringify(value));
        if (typeof obj !== 'object') {
            return undefined;
        }
        return obj;
    } catch {
        return undefined;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getHttpResponse(_default: string, value?: any): string {
    return value?.['message']?.toString() ?? value?.toString() ?? _default;
}

@Catch()
export class ScaExceptionFilter implements ExceptionFilter {
    public constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    public catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const {httpAdapter} = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        const response = new ScaExceptionFilterDto();
        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = 'Internal server error';
        response.path = this.getPath(host);

        if (exception instanceof Error) {
            response.message = exception.message;
            response.stack = exception.stack
                ?.split('\n')
                .map((line) => line.trim());

            if (exception instanceof TypeORMError) {
                if (exception instanceof QueryFailedError) {
                    if (response.message.includes('constraint failed')) {
                        response.statusCode = HttpStatus.CONFLICT;
                    } else if (
                        response.message.includes('no such table') ||
                        response.message.includes('no such column')
                    ) {
                        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                        response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                    }
                } else if (exception instanceof EntityNotFoundError) {
                    response.statusCode = HttpStatus.NOT_FOUND;
                    response.cause = toJson(exception.criteria);
                }
            } else if (exception instanceof HttpException) {
                response.statusCode = exception.getStatus();
                response.message = getHttpResponse(
                    response.message,
                    exception.getResponse()
                );
                response.cause = toJson(exception.cause);
            }
        }

        httpAdapter.reply(ctx.getResponse(), response, response.statusCode);
    }

    protected getPath(host: ArgumentsHost): string {
        const {httpAdapter} = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        return httpAdapter.getRequestUrl(ctx.getRequest());
    }
}
