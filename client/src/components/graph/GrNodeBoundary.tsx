import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC, PropsWithChildren} from 'react';

export const GrNodeBoundary: FC<PropsWithChildren<PropsWithClassName>> = ({
    className,
    children
}) => {
    return (
        <div className={cn('flex flex-col gap-2', className)}>{children}</div>
    );
};
