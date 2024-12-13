import {ScaffoldObjectResponseInterceptor} from '@/scaffold/interceptors/scaffold-object-response.interceptor';
import {applyDecorators, UseInterceptors} from '@nestjs/common';

class EmptyDto {}

// TODO: might fail, because it's testing for an empty "{}" JSON object instead of no data.
export function ScaResponseVoid() {
    return applyDecorators(
        UseInterceptors(new ScaffoldObjectResponseInterceptor(EmptyDto))
    );
}
