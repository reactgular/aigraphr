import {NavDashboard} from '@/components/navs/NavDashboard';
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

interface AppSidebarProps {
    projectId: number;
}

export const ProjectSidebar: FC<AppSidebarProps> = ({projectId}) => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <ProjectSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavDashboard projectId={projectId} />
                <NavResources projectId={projectId} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
