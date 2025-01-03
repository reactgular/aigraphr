import {ScaResponseInterceptor} from '@/scaffold/interceptors/sca-response.interceptor';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    InternalServerErrorException,
    NestInterceptor,
    Type
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class ScaObjectResponseInterceptor<T extends object>
    extends ScaResponseInterceptor<T>
    implements NestInterceptor<T, T>
{
    public constructor(dto: Type<T>) {
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
