import {SidebarInput} from '@/components/shadcn/ui/sidebar';
import {Search} from 'lucide-react';
import {ComponentProps, FC} from 'react';
import {Label} from '../shadcn/ui/label';

export const AppSideBarSearch: FC<ComponentProps<'form'>> = (props) => {
    return (
        <form className="relative" {...props}>
            <Label htmlFor="search" className="sr-only">
                Search
            </Label>
            <SidebarInput
                id="search"
                placeholder="Search for anything"
                className="pl-8"
            />
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
        </form>
    );
};
