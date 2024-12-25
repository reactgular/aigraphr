import {ScaEntity} from '@/scaffold/models/sca.entity';

export interface ScaCrudCreate<
    TDto extends ScaEntity,
    TCreateDto extends object
> {
    scaCreate(data: TCreateDto): Promise<TDto>;
}
