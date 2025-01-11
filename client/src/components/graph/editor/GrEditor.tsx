import {GrEditorFlow} from '@/components/graph/editor/GrEditorFlow';
import {GrEditorProvider} from '@/components/graph/editor/GrEditorProvider';
import {type WorkspaceAddress} from '@/components/hooks/useWorkspaceDto';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
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
                    <GrEditorFlow />
                </div>
            </GrEditorProvider>
        </GrWorkspaceAddress.Provider>
    );
};
