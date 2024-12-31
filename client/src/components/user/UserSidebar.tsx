import {NavResources} from '@/components/navs/NavResources';
import {NavUser} from '@/components/navs/NavUser';
import {ProjectSwitcher} from '@/components/projects/ProjectSwitcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail
} from '@/components/shadcn/ui/sidebar';
import type {FC} from 'react';

export const UserSidebar: FC = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <ProjectSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavResources projectId={999} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
