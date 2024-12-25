import {ScaEntity} from '@/scaffold/models/sca.entity';

export interface ScaCrudUpdate<
    TDto extends ScaEntity,
    TUpdateDto extends object
> {
    scaUpdate(id: number, data: TUpdateDto): Promise<TDto>;
}
