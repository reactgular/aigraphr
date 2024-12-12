import {PipeTransform, Type} from '@nestjs/common';

/**
 * @deprecated
 */
export interface ScaffoldParam {
    method?: Array<MethodDecorator>;
    param?: Array<Type<PipeTransform> | PipeTransform>;
    query?: Array<Type<PipeTransform> | PipeTransform>;
    body?: Array<Type<PipeTransform> | PipeTransform>;
}
