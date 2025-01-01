import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC, PropsWithChildren} from 'react';

export const GrNodeFrame: FC<PropsWithChildren<PropsWithClassName>> = ({
    className,
    children
}) => {
    return (
        <div className={cn('border rounded-md overflow-hidden', className)}>
            {children}
        </div>
    );
};
