import type {GrNodeDefParamDto} from '@/api';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import {Handle, Position} from '@xyflow/react';
import {cva, type VariantProps} from 'class-variance-authority';
import type {FC} from 'react';

type Side = 'left' | 'right';

const paramVariants = cva('flex gap-1 relative items-center', {
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

const dotVariants = cva('!w-[0.75rem] !h-[0.75rem] !rounded-full !shrink-0', {
    variants: {
        side: {
            left: '!left-[0.4rem]',
            right: '!right-[0.4rem]'
        } satisfies Record<Side, string>,
        type: {
            userType: '!bg-green-600 !dark:bg-green-400',
            string: '!bg-emerald-600 !dark:bg-emerald-400',
            number: '!bg-teal-600 !dark:bg-teal-400',
            boolean: '!bg-cyan-600 !dark:bg-cyan-400',
            object: '!bg-sky-600 !dark:bg-sky-400'
        } satisfies Record<GrNodeDefParamDto['type'], string>
    }
});

const nameVariants = cva('text-ellipsis overflow-hidden', {
    variants: {
        side: {
            left: 'pl-4',
            right: 'pr-4'
        } satisfies Record<Side, string>
    }
});

interface GrNodeParamProps extends VariantProps<typeof paramVariants> {
    param: GrNodeDefParamDto;
}

const GrNodeParam: FC<GrNodeParamProps> = ({param: {name, type}, side}) => {
    return (
        <div className={paramVariants({side, type})}>
            <Handle
                id={`param-${side}-${name}`}
                className={dotVariants({side, type})}
                type="target"
                position={side === 'left' ? Position.Left : Position.Right}
            />
            <div className={nameVariants({side})}>{name}</div>
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
        <div className={cn('relative flex flex-col', className)}>
            {params.map((param) => (
                <GrNodeParam key={param.name} param={param} side={side} />
            ))}
        </div>
    );
};
