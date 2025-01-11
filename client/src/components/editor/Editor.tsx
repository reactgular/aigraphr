import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const Editor: FC<PropsWithClassName> = ({className}) => {
    return <div className={cn('w-full h-full', className)}>EDITOR</div>;
};
