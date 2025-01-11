import {useGrNode} from '@/components/graph/hooks/useGrNode';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GrNodeName: FC<PropsWithClassName> = ({className}) => {
    const node = useGrNode();
    return <div className={cn('text-xl', className)}>{node.name}</div>;
};
