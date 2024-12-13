import {ScaCrudService} from '@/scaffold/crud/sca-crud.service';
import {
    ScaPaginate,
    ScaPaginateResponse
} from '@/scaffold/decorators/sca-paginate';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Logger, Type} from '@nestjs/common';

export function scaPaginateMixin<
    TDo extends ScaEntity,
    TBase extends ScaConstructor
>(dto: Type<TDo>, Base: TBase = ScaEmptyBase as TBase) {
    abstract class ScaPaginateClass extends Base {
        abstract crud(): ScaCrudService<TDo>;

        @ScaPaginate(dto)
        async scaPaginate(): ScaPaginateResponse<TDo> {
            Logger.log('Paginate', 'ScaPaginateMixin');
            return await this.crud().scaPaginate();
        }
    }

    return ScaPaginateClass;
}
