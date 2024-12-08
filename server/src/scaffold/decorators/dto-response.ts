import {ScaffoldObjectResponseInterceptor} from '@/scaffold/interceptors/scaffold-object-response.interceptor';
import {applyDecorators, UseInterceptors} from '@nestjs/common';

export function DtoResponse<T extends object>(dto: new () => T) {
    const decorators = [
        UseInterceptors(new ScaffoldObjectResponseInterceptor<T>(dto))
    ];
    return applyDecorators(...decorators);
}
