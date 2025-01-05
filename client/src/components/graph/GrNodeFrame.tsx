import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import {cva, type VariantProps} from 'class-variance-authority';
import type {FC, PropsWithChildren} from 'react';

const variants = cva('rounded-md shadow-md shadow-gray-500/20', {
    variants: {
        status: {
            error: 'border border-red-500 outline outline-red-500/20 outline-4',
            selected:
                'border border-primary outline outline-primary/20 outline-4'
        }
    }
});

type GrNodeFrameProps = VariantProps<typeof variants>;

export const GrNodeFrame: FC<
    PropsWithChildren<PropsWithClassName<GrNodeFrameProps>>
> = ({className, children, status}) => {
    return <div className={cn(variants({status}), className)}>{children}</div>;
};
