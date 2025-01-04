import type {GrNodeDefParamDto} from '@/api';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import {cva, type VariantProps} from 'class-variance-authority';
import type {FC} from 'react';

const grNodeParamVariants = cva('flex gap-1 items-center text-red-500', {
    variants: {
        side: {
            left: 'ml-[-0.4rem]',
            right: 'flex-row-reverse mr-[-0.4rem]'
        },
        type: {
            userType: 'text-green-600 dark:text-green-400',
            string: 'text-emeraid-600 dark:text-emeraid-400',
            number: 'text-teal-600 dark:text-teal-400',
            boolean: 'text-cyan-600 dark:text-cyan-400',
            object: 'text-sky-600 dark:text-sky-400'
        } satisfies Record<GrNodeDefParamDto['type'], string>
    }
});

const roundedVariants = cva('w-[0.75rem] h-[0.75rem] rounded-full', {
    variants: {
        type: {
            userType: 'bg-green-600 dark:bg-green-400',
            string: 'bg-emeraid-600 dark:bg-emeraid-400',
            number: 'bg-teal-600 dark:bg-teal-400',
            boolean: 'bg-cyan-600 dark:bg-cyan-400',
            object: 'bg-sky-600 dark:bg-sky-400'
        } satisfies Record<GrNodeDefParamDto['type'], string>
    }
});

interface GrNodeParamProps extends VariantProps<typeof grNodeParamVariants> {
    param: GrNodeDefParamDto;
}

const GrNodeParam: FC<GrNodeParamProps> = ({param: {name, type}, side}) => {
    return (
        <div className={grNodeParamVariants({side, type})}>
            <div className={roundedVariants({type})} />
            {name}
        </div>
    );
};

const grNodeParamsVariants = cva('flex flex-col items-start w-1/2', {
    variants: {
        side: {
            left: '',
            right: 'flex-row-reverse'
        }
    },
    defaultVariants: {
        side: 'left'
    }
});

interface GrNodeParamsProps extends VariantProps<typeof grNodeParamsVariants> {
    params: GrNodeDefParamDto[];
}

export const GrNodeParams: FC<PropsWithClassName<GrNodeParamsProps>> = ({
    className,
    params,
    side
}) => {
    return (
        <div className={cn(grNodeParamsVariants({side}), className)}>
            {params.map((param) => (
                <GrNodeParam key={param.name} param={param} side={side} />
            ))}
        </div>
    );
};
