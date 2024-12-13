import {ScaffoldArrayResponseInterceptor} from '@/scaffold/interceptors/scaffold-array-response.interceptor';
import {ScaffoldObjectResponseInterceptor} from '@/scaffold/interceptors/scaffold-object-response.interceptor';
import {
    applyDecorators,
    InternalServerErrorException,
    Type,
    UseInterceptors
} from '@nestjs/common';

function isOneElementArray<T>(array: T | T[]): array is T[] {
    return Array.isArray(array) && array.length === 1;
}

function isOneObject<T>(object: T | [T]): object is T {
    return !Array.isArray(object);
}

export function ScaResponse<T extends object>(dto: Type<T> | [Type<T>]) {
    if (isOneElementArray(dto)) {
        return applyDecorators(
            UseInterceptors(new ScaffoldArrayResponseInterceptor<T>(dto[0]))
        );
    } else if (isOneObject(dto)) {
        return applyDecorators(
            UseInterceptors(new ScaffoldObjectResponseInterceptor<T>(dto))
        );
    }

    throw new InternalServerErrorException('Invalid parameter for Response');
}
