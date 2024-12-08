import {ScaffoldArrayResponseInterceptor} from '@/scaffold/interceptors/scaffold-array-response.interceptor';
import {applyDecorators, UseInterceptors} from '@nestjs/common';

export function DtoArrayResponse<T extends object>(dto: new () => T) {
    const decorators = [
        UseInterceptors(new ScaffoldArrayResponseInterceptor<T>(dto))
    ];
    return applyDecorators(...decorators);
}
