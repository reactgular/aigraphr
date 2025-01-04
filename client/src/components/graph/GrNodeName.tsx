import {type NodeAddress, useNode} from '@/components/graph/hooks/useNode';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

interface GrNodeNameProps {
    address: NodeAddress;
}

export const GrNodeName: FC<PropsWithClassName<GrNodeNameProps>> = ({
    address,
    className
}) => {
    const node = useNode(address);
    return <div className={cn('text-xl', className)}>{node.name}</div>;
};
