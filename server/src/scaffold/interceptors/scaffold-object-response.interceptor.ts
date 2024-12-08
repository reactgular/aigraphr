import {ScaffoldResponseInterceptor} from '@/scaffold/interceptors/scaffold-response.interceptor';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    NestInterceptor
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class ScaffoldObjectResponseInterceptor<T extends object>
    extends ScaffoldResponseInterceptor<T>
    implements NestInterceptor<T, T>
{
    public constructor(dto: new () => T) {
        super(dto);
    }

    public intercept(
        context: ExecutionContext,
        next: CallHandler<T>
    ): Observable<T> {
        return next.handle().pipe(
            switchMap(async (data) => {
                this.isNotEmpty(data);

                if (Array.isArray(data)) {
                    throw new InternalServerErrorException({
                        message: 'Response validation failed',
                        errors: [
                            {
                                property: 'response',
                                constraints: {
                                    isArray: 'Response should be an object'
                                }
                            }
                        ]
                    });
                }

                return await this.validate(data);
            })
        );
    }
}
