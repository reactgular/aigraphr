import {GrEditorProvider} from '@/components/graph/editor/GrEditorProvider';
import {type WorkspaceAddress} from '@/components/hooks/useWorkspaceDto';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow
} from '@xyflow/react';
import type {FC} from 'react';
import {GrWorkspaceAddress} from '../context/GrWorkspaceAddress';

interface GrEditorProps {
    address: WorkspaceAddress;
}

export const GrEditor: FC<PropsWithClassName<GrEditorProps>> = ({
    address,
    className
}) => {
    return (
        <GrWorkspaceAddress.Provider value={address}>
            <GrEditorProvider>
                <div className={cn('w-full h-full', className)}>
                    <ReactFlow nodes={[]} edges={[]} fitView>
                        <Controls />
                        <MiniMap />
                        <Background
                            color="#bbb"
                            variant={BackgroundVariant.Dots}
                        />
                    </ReactFlow>
                </div>
            </GrEditorProvider>
        </GrWorkspaceAddress.Provider>
    );
};
