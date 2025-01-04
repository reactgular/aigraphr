import {GrNodeParams} from '@/components/graph/GrNodeParams';
import {type NodeAddress, useNode} from '@/components/graph/hooks/useNode';
import {useNodeDef} from '@/components/graph/hooks/useNodeDef';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

interface GrNodeContentProps {
    address: NodeAddress;
}

export const GrNodeContent: FC<PropsWithClassName<GrNodeContentProps>> = ({
    address,
    className
}) => {
    const node = useNode(address);
    const def = useNodeDef(node.type);

    return (
        <div className={cn('flex py-2', className)}>
            <GrNodeParams side="left" params={def.inputs} />
            <GrNodeParams side="right" params={def.outputs} />
        </div>
    );
};
