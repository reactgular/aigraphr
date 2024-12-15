import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import {QueryFailedError, TypeORMError} from 'typeorm';

@Catch()
export class TypeormExceptionFilter implements ExceptionFilter {
    public constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    public catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const {httpAdapter} = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        const response: Record<
            string,
            string | Array<string> | number | undefined
        > & {statusCode: number} = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            path: this.getPath(host)
        };

        if (exception instanceof Error) {
            response['message'] = exception.message;
            response['stack'] = exception.stack
                ?.split('\n')
                .map((line) => line.trim());

            if (exception instanceof TypeORMError) {
                // TODO: Not all query failures are bad requests, we should handle this better.
                if (exception instanceof QueryFailedError) {
                    response['statusCode'] = HttpStatus.BAD_REQUEST;
                }
            } else if (exception instanceof HttpException) {
                response['statusCode'] = exception.getStatus();
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
