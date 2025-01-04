import {type NodeAddress, useNode} from '@/components/graph/hooks/useNode';
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
    return <div className={cn('px-4 py-4', className)}>Contents</div>;
};
