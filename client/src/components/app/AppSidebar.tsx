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
import {ComponentProps, FC} from 'react';

export const AppSidebar: FC<ComponentProps<typeof Sidebar>> = (props) => {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <ProjectSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavDashboard />
                <NavProject projectId={1} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
