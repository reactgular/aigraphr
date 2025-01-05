import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GrNodeFooter: FC<PropsWithClassName> = ({className}) => {
    return (
        <div className={cn('rounded-b-md bg-gray-200/60 px-4 py-2', className)}>
            Footer
        </div>
    );
};
