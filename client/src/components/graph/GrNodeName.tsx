import {GrNodeState} from '@/components/graph/GrNodeState';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GrNodeName: FC<PropsWithClassName> = ({className}) => {
    const {dto} = GrNodeState.useState();

    return <div className={cn('text-xl', className)}>{dto?.name}</div>;
};
