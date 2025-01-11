import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow
} from '@xyflow/react';
import type {FC} from 'react';

export const Editor: FC<PropsWithClassName> = ({className}) => {
    return (
        <div className={cn('w-full h-full', className)}>
            <ReactFlow nodes={[]} edges={[]} fitView>
                <Controls />
                <MiniMap />
                <Background color="#bbb" variant={BackgroundVariant.Dots} />
            </ReactFlow>
        </div>
    );
};
