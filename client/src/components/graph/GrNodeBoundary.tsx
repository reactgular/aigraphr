import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC, PropsWithChildren} from 'react';

interface GrNodeBoundaryProps {
    width: number;
}

export const GrNodeBoundary: FC<
    PropsWithChildren<PropsWithClassName<GrNodeBoundaryProps>>
> = ({className, children, width}) => {
    return (
        <div
            className={cn('flex flex-col gap-2', className)}
            style={{width: `${width}px`}}
        >
            {children}
        </div>
    );
};
