import type {GrNodeDefParamDto} from '@/api';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import {cva, type VariantProps} from 'class-variance-authority';
import type {FC} from 'react';

type Side = 'left' | 'right';

const paramVariants = cva('flex gap-1 items-center', {
    variants: {
        side: {
            left: 'ml-[-0.4rem]',
            right: 'flex-row-reverse mr-[-0.4rem]'
        } satisfies Record<Side, string>,
        type: {
            userType: 'text-green-600 dark:text-green-400',
            string: 'text-emerald-600 dark:text-emerald-400',
            number: 'text-teal-600 dark:text-teal-400',
            boolean: 'text-cyan-600 dark:text-cyan-400',
            object: 'text-sky-600 dark:text-sky-400'
        } satisfies Record<GrNodeDefParamDto['type'], string>
    }
});

const dotVariants = cva('w-[0.75rem] h-[0.75rem] rounded-full', {
    variants: {
        type: {
            userType: 'bg-green-600 dark:bg-green-400',
            string: 'bg-emerald-600 dark:bg-emerald-400',
            number: 'bg-teal-600 dark:bg-teal-400',
            boolean: 'bg-cyan-600 dark:bg-cyan-400',
            object: 'bg-sky-600 dark:bg-sky-400'
        } satisfies Record<GrNodeDefParamDto['type'], string>
    }
});

interface GrNodeParamProps extends VariantProps<typeof paramVariants> {
    param: GrNodeDefParamDto;
}

const GrNodeParam: FC<GrNodeParamProps> = ({param: {name, type}, side}) => {
    return (
        <div className={paramVariants({side, type})}>
            <div className={dotVariants({type})} />
            {name}
        </div>
    );
};

interface GrNodeParamsProps {
    params: GrNodeDefParamDto[];

    side: Side;
}

export const GrNodeParams: FC<PropsWithClassName<GrNodeParamsProps>> = ({
    className,
    params,
    side
}) => {
    return (
        <div className={cn('flex flex-col w-1/2', className)}>
            {params.map((param) => (
                <GrNodeParam key={param.name} param={param} side={side} />
            ))}
        </div>
    );
};
