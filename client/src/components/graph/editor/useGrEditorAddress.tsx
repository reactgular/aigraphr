import {GrEditorAddress} from '@/components/graph/editor/GrEditorAddress';
import type {WorkspaceAddress} from '@/components/hooks/useWorkspaceDto';
import {useContext} from 'react';

export const useGrEditorAddress = (): WorkspaceAddress => {
    const address = useContext(GrEditorAddress);
    if (address === null) {
        throw new Error('GrWorkspaceAddress is not provided');
    }
    return address;
};
