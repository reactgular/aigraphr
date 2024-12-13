import {
    ScaPaginate,
    ScaPaginateResponse
} from '@/scaffold/decorators/sca-paginate';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

export function scaPaginateMixin<
    TDo extends ScaEntity,
    TBase extends ScaConstructor
>(dto: Type<TDo>, Base: TBase = ScaEmptyBase as TBase) {
    class ScaPaginateClass extends Base {
        public constructor(...args: any[]) {
            super(...args);
        }

        @ScaPaginate(dto)
        public async scaPaginate(): ScaPaginateResponse<TDo> {
            // return await this.projects.index();
            return null as any;
        }
    }

    return ScaPaginateClass;
}
