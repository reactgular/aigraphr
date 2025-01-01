import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GrNodeHeader: FC<PropsWithClassName> = ({className}) => {
    return (
        <div className={cn('bg-gray-200/60 px-4 py-2', className)}>
            Wait for 1 day
        </div>
    );
};
