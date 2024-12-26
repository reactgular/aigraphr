import {NavDashboard} from '@/components/navs/NavDashboard';
import {NavProject} from '@/components/navs/NavProject';
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

export interface AppSidebarProps {
    projectId: number;
}

export const AppSidebar: FC<AppSidebarProps> = ({projectId}) => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <ProjectSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavDashboard projectId={projectId} />
                <NavProject projectId={projectId} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
