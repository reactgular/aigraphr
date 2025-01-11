import {GrWorkspaceAddress} from '@/components/graph/context/GrWorkspaceAddress';
import {
    useWorkspaceDto,
    type WorkspaceAddress
} from '@/components/hooks/useWorkspaceDto';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow
} from '@xyflow/react';
import type {FC} from 'react';

interface GrEditorProps {
    address: WorkspaceAddress;
}

export const GrEditor: FC<PropsWithClassName<GrEditorProps>> = ({
    address,
    className
}) => {
    const data = useWorkspaceDto(address);

    return (
        <div className={cn('w-full h-full', className)}>
            <GrWorkspaceAddress.Provider value={address}>
                <ReactFlow nodes={[]} edges={[]} fitView>
                    <Controls />
                    <MiniMap />
                    <Background color="#bbb" variant={BackgroundVariant.Dots} />
                </ReactFlow>
            </GrWorkspaceAddress.Provider>
        </div>
    );
};
