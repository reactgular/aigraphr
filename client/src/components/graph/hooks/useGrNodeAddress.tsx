import {GrNodeAddress} from '@/components/graph/context/GrNodeAddress';
import type {NodeAddress} from '@/components/hooks/useNodeDto';
import {useContext} from 'react';

export const useGrNodeAddress = (): NodeAddress => {
    const address = useContext(GrNodeAddress);
    if (address === null) {
        throw new Error(
            'useGrNodeAddress must be used inside a GrNodeAddress.Provider'
        );
    }
    return address;
};
