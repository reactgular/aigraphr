import {cn} from '@/components/shadcn/lib/utils';
import {Label} from '@/components/shadcn/ui/label';
import {SidebarInput} from '@/components/shadcn/ui/sidebar';
import {Search} from 'lucide-react';
import {ComponentProps, FC} from 'react';

export const AppSearchForm: FC<ComponentProps<'form'>> = ({
    className,
    ...props
}) => {
    return (
        <form className={cn(className, 'relative')} {...props}>
            <Label htmlFor="search" className="sr-only">
                Search
            </Label>
            <SidebarInput
                id="search"
                placeholder="Search for everything"
                className="pl-8"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </form>
    );
};
