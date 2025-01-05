import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import {Tally3} from 'lucide-react';
import type {FC} from 'react';

export const GrNodeFooter: FC<PropsWithClassName> = ({className}) => {
    return (
        <div className={cn('rounded-b-md bg-gray-200/60', className)}>
            <Tally3 className="rotate-90" />
            <div className="px-4 py-2 truncate overflow-hidden">Footer</div>
        </div>
    );
};
