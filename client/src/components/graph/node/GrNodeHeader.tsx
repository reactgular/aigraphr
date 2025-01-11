import {GrNodeIcon} from '@/components/graph/node/GrNodeIcon';
import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import type {FC} from 'react';

export const GrNodeHeader: FC<PropsWithClassName> = ({className}) => {
    return (
        <div
            className={cn(
                'grid grid-cols-[1fr_1rem_0.5rem] rounded-t-md border-b bg-gray-200/60',
                className
            )}
        >
            <div className="pl-4 pr-1 py-2 truncate overflow-hidden">
                <GrNodeIcon />
            </div>
            <button className="bg-green-400" />
        </div>
    );
};
