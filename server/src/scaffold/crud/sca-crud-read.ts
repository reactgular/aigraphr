import {ScaEntity} from '@/scaffold/crud/sca-entity';
import {ScaGetResponse} from '@/scaffold/decorators/sca-get';
import {ScaPaginateResponse} from '@/scaffold/decorators/sca-paginate';

export interface ScaCrudRead<TDto extends ScaEntity> {
    scaGet(id: number): ScaGetResponse<TDto>;

    scaPaginate(): ScaPaginateResponse<TDto>;
}
