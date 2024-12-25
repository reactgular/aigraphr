import {SidebarHeader} from '@/components/shadcn/ui/sidebar';
import {FC} from 'react';

export const AppSideBarHeader: FC = () => {
    return (
        <SidebarHeader className="text-xl font-bold border-b">
            AIGraphr
        </SidebarHeader>
    );
};
