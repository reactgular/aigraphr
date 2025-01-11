import {GrEditorFlow} from '@/components/graph/editor/GrEditorFlow';
import {GrEditorProvider} from '@/components/graph/editor/GrEditorProvider';
import {type WorkspaceAddress} from '@/components/hooks/useWorkspaceDto';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';
import {GrEditorAddress} from './GrEditorAddress';

interface GrEditorProps {
    address: WorkspaceAddress;
}

export const GrEditor: FC<PropsWithClassName<GrEditorProps>> = ({
    address,
    className
}) => {
    return (
        <GrEditorAddress.Provider value={address}>
            <GrEditorProvider>
                <div className={cn('w-full h-full', className)}>
                    <GrEditorFlow />
                </div>
            </GrEditorProvider>
        </GrEditorAddress.Provider>
    );
};
