import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import {cva, type VariantProps} from 'class-variance-authority';
import type {FC, PropsWithChildren} from 'react';

const variants = cva('rounded-md border shadow-md shadow-gray-500/20', {
    variants: {
        error: {
            true: 'border-red-500',
            false: ''
        },
        selected: {
            true: 'outline outline-4',
            false: ''
        },
        active: {
            true: 'border-yellow-500',
            false: ''
        }
    },
    compoundVariants: [
        {
            error: false,
            selected: true,
            class: 'border-primary outline-primary/20 dark:border-primary dark:outline-primary/20'
        },
        {
            error: true,
            selected: true,
            class: 'border-red-500 outline-red-500/20 dark:border-red-500 dark:outline-red-500/20'
        },
        {
            error: true,
            selected: false,
            active: true,
            class: 'border-red-500 dark:border-red-500'
        },
        {
            error: false,
            selected: false,
            active: false,
            class: 'border-gray-300 dark:border-gray-700'
        }
    ],
    defaultVariants: {
        error: false,
        selected: false,
        active: false
    }
});

type GrNodeFrameProps = VariantProps<typeof variants>;

export const GrNodeFrame: FC<
    PropsWithChildren<PropsWithClassName<GrNodeFrameProps>>
> = ({className, children, error, selected, active}) => {
    return (
        <div className={cn(variants({error, selected, active}), className)}>
            {children}
        </div>
    );
};
