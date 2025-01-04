import {
    type NodeAddress,
    useNodesGet
} from '@/components/graph/hooks/useNodesGet';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

interface GrNodeNameProps {
    address: NodeAddress;
}

export const GrNodeName: FC<PropsWithClassName<GrNodeNameProps>> = ({
    address,
    className
}) => {
    const {data} = useNodesGet(address);
    return <div className={cn('text-xl', className)}>{data?.name}</div>;
};
