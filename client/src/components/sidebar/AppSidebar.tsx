import {
    Sidebar,
    SidebarContent,
    SidebarRail
} from '@/components/shadcn/ui/sidebar';
import {AppSideBarCTA} from '@/components/sidebar/AppSideBarCTA';
import {AppSideBarData} from '@/components/sidebar/AppSideBarData';
import {AppSideBarHeader} from '@/components/sidebar/AppSideBarHeader';
import {AppSideBarProject} from '@/components/sidebar/AppSideBarProject';
import {ComponentProps, FC} from 'react';

export const AppSidebar: FC<ComponentProps<typeof Sidebar>> = ({...props}) => {
    return (
        <Sidebar {...props}>
            <SidebarContent>
                <AppSideBarHeader />
                <AppSideBarCTA />
                <AppSideBarProject />
                <AppSideBarData />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};
