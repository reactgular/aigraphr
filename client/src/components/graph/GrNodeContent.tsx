import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GrNodeContent: FC<PropsWithClassName> = ({className}) => {
    return <div className={cn('px-4 py-4', className)}>Contents</div>;
};
