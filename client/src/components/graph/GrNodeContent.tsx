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

    const hasLeft = def.inputs.length > 0;
    const hasRight = def.outputs.length > 0;

    return (
        <div className={cn('flex py-2', className)}>
            {hasLeft ? (
                <GrNodeParams
                    className={hasRight ? 'w-1/2' : 'w-full'}
                    side="left"
                    params={def.inputs}
                />
            ) : null}
            {hasRight ? (
                <GrNodeParams
                    className={hasLeft ? 'w-1/2' : 'w-full'}
                    side="right"
                    params={def.outputs}
                />
            ) : null}
        </div>
    );
};
