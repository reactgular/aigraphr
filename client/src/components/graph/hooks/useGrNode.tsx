import type {NodeDto} from '@/api';

import {useGrNodeAddress} from '@/components/graph/hooks/useGrNodeAddress';
import {useNodeDto} from '@/components/hooks/useNodeDto';

export const useGrNode = (): NodeDto => {
    const address = useGrNodeAddress();
    return useNodeDto(address);
};
