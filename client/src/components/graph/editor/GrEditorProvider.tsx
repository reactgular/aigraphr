import {GrEditorContext} from '@/components/graph/context/GrEditorContext';
import {useGrWorkspaceAddress} from '@/components/graph/hooks/useGrWorkspaceAddress';
import {useEdgesDto} from '@/components/hooks/useEdgesDto';
import {useNodesDto} from '@/components/hooks/useNodesDto';
import {useWorkspaceDto} from '@/components/hooks/useWorkspaceDto';
import type {FC, PropsWithChildren} from 'react';
import {GrWorkspaceAddress} from '../context/GrWorkspaceAddress';

export const GrEditorProvider: FC<PropsWithChildren> = ({children}) => {
    const address = useGrWorkspaceAddress();
    const workspace = useWorkspaceDto(address);
    const nodes = useNodesDto(address);
    const edges = useEdgesDto(address);

    return (
        <GrEditorContext.Provider value={{workspace, nodes, edges}}>
            <GrWorkspaceAddress.Provider value={address}>
                {children}
            </GrWorkspaceAddress.Provider>
        </GrEditorContext.Provider>
    );
};
