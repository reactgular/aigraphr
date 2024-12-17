import {ScaEntity} from '@/scaffold/models/sca.entity';

export function expectPartial<TEntity extends ScaEntity>(
    value: Omit<TEntity, 'id'>
) {
    return (resp: Response) =>
        expect(resp.body).toEqual(expect.objectContaining(value));
}
