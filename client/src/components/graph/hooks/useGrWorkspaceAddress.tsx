import {GrWorkspaceAddress} from '@/components/graph/context/GrWorkspaceAddress';
import type {WorkspaceAddress} from '@/components/hooks/useWorkspaceDto';
import {useContext} from 'react';

export const useGrWorkspaceAddress = (): WorkspaceAddress => {
    const address = useContext(GrWorkspaceAddress);
    if (address === null) {
        throw new Error('GrWorkspaceAddress is not provided');
    }
    return address;
};
