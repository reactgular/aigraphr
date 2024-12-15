import {PipeTransform, Type} from '@nestjs/common';

/**
 * @deprecated
 */
export interface ScaffoldParam {
    body?: Array<Type<PipeTransform> | PipeTransform>;
    method?: Array<MethodDecorator>;
    param?: Array<Type<PipeTransform> | PipeTransform>;
    query?: Array<Type<PipeTransform> | PipeTransform>;
}
