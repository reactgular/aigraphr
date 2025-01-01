import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GrNodeFooter: FC<PropsWithClassName> = ({className}) => {
    return <div className={cn('bg-accent px-4 py-2', className)}>Footer</div>;
};
