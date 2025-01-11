import {GrEditorContext} from '@/components/graph/editor/GrEditorContext';
import {useGrEditorAddress} from '@/components/graph/editor/useGrEditorAddress';
import {useEdgesDto} from '@/components/hooks/useEdgesDto';
import {useNodesDto} from '@/components/hooks/useNodesDto';
import {useWorkspaceDto} from '@/components/hooks/useWorkspaceDto';
import type {FC, PropsWithChildren} from 'react';
import {GrEditorAddress} from './GrEditorAddress';

export const GrEditorProvider: FC<PropsWithChildren> = ({children}) => {
    const address = useGrEditorAddress();
    const workspace = useWorkspaceDto(address);
    const nodes = useNodesDto(address);
    const edges = useEdgesDto(address);

    return (
        <GrEditorContext.Provider value={{workspace, nodes, edges}}>
            <GrEditorAddress.Provider value={address}>
                {children}
            </GrEditorAddress.Provider>
        </GrEditorContext.Provider>
    );
};
