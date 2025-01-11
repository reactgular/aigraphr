import {cn, type PropsWithClassName} from '@/components/shadcn/lib/utils';
import {Tally1, Tally2, Tally3} from 'lucide-react';
import type {FC} from 'react';
import {ToggleGroup, ToggleGroupItem} from '../../shadcn/ui/toggle-group';

export const GrNodeFooter: FC<PropsWithClassName> = ({className}) => {
    return (
        <div
            className={cn(
                'flex justify-end rounded-b-md bg-gray-200/60',
                className
            )}
        >
            <ToggleGroup className="gap-0" type="single">
                <ToggleGroupItem className="h-6 min-w-6 w-6" value="a">
                    <Tally3 className="rotate-90" />
                </ToggleGroupItem>
                <ToggleGroupItem className="h-6 min-w-6 w-6" value="b">
                    <Tally2 className="rotate-90" />
                </ToggleGroupItem>
                <ToggleGroupItem className="h-6 min-w-6 w-6" value="c">
                    <Tally1 className="rotate-90" />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
};
