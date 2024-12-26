import {NavDashboard} from '@/components/navs/NavDashboard';
import {NavMain} from '@/components/navs/NavMain';
import {NavUser} from '@/components/navs/NavUser';
import {NavWorkspaces} from '@/components/navs/NavWorkspaces';
import {ProjectSwitcher} from '@/components/projects/ProjectSwitcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail
} from '@/components/shadcn/ui/sidebar';
import {ComponentProps, FC} from 'react';

export const AppSidebar: FC<ComponentProps<typeof Sidebar>> = (props) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <ProjectSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavDashboard />
                <NavMain />
                <NavWorkspaces />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
