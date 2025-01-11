import {useGrNodeContext} from '@/components/graph/node/useGrNodeContext';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GrNodeName: FC<PropsWithClassName> = ({className}) => {
    const {data} = useGrNodeContext();
    return <div className={cn('text-xl', className)}>{data.name}</div>;
};
