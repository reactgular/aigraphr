import {ScaParamId} from '@/scaffold/decorators/sca-param-id';
import {ScaRemove, ScaRemoveResponse} from '@/scaffold/decorators/sca-remove';
import {ScaConstructor, ScaEmptyBase} from '@/scaffold/mixins/sca.mixin';
import {ScaEntity} from '@/scaffold/models/sca.entity';
import {Type} from '@nestjs/common';

export function scaRemoveMixin<
    TDo extends ScaEntity,
    TBase extends ScaConstructor
>(dto: Type<TDo>, Base: TBase = ScaEmptyBase as TBase) {
    class ScaRemoveClass extends Base {
        public constructor(...args: any[]) {
            super(...args);
        }

        @ScaRemove(dto)
        public async scaRemove(@ScaParamId() id: number): ScaRemoveResponse {
            // await this.projects.remove(id);
        }
    }

    return ScaRemoveClass;
}
