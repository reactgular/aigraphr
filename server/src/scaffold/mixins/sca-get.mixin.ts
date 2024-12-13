import {ScaGet, ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaffoldEntity} from '@/scaffold/models/scaffold.entity';
import {Type} from '@nestjs/common';

export function ScaGetMixin<
    TDo extends ScaffoldEntity,
    TBase extends ScaConstructor
>(dto: Type<TDo>, Base: TBase = ScaEmptyBase as TBase) {
    class ScaGetClass extends Base {
        public constructor(...args: any[]) {
            super(...args);
        }

        @ScaGet(dto)
        public async get(@ScaParamId() id: number): ScaGetResponse<TDo> {
            // return await this.projects.get(id);
            return null as any;
        }
    }

    return ScaGetClass;
}
