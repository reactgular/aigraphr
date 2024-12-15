import {ScaRemoveResponse} from '@/scaffold/decorators/sca-remove';

export interface ScaCrudRemove {
    scaRemove(id: number): ScaRemoveResponse;
}
