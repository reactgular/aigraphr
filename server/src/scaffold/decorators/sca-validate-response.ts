import {ScaArrayResponseInterceptor} from '@/scaffold/interceptors/sca-array-response.interceptor';
import {ScaObjectResponseInterceptor} from '@/scaffold/interceptors/sca-object-response.interceptor';
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

export function ScaValidateResponse<T extends object>(
    dto: Type<T> | [Type<T>]
) {
    if (isOneElementArray(dto)) {
        return applyDecorators(
            UseInterceptors(new ScaArrayResponseInterceptor<T>(dto[0]))
        );
    } else if (isOneObject(dto)) {
        return applyDecorators(
            UseInterceptors(new ScaObjectResponseInterceptor<T>(dto))
        );
    }

    throw new InternalServerErrorException('Invalid parameter for Response');
}
