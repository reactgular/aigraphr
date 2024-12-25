import {
    Sidebar,
    SidebarContent,
    SidebarRail
} from '@/components/shadcn/ui/sidebar';
import {AppSideBarHeader} from '@/components/sidebar/AppSideBarHeader';
import {AppSideBarMenu} from '@/components/sidebar/AppSideBarMenu';
import {useSideBarDashboard} from '@/components/sidebar/hooks/useSideBarDashboard';
import {useSideBarGeneral} from '@/components/sidebar/hooks/useSideBarGeneral';
import {useSideBarProjects} from '@/components/sidebar/hooks/useSideBarProjects';
import {ComponentProps, FC} from 'react';

export const AppSideBar: FC<ComponentProps<typeof Sidebar>> = ({...props}) => {
    const dashboard = useSideBarDashboard();
    const projects = useSideBarProjects();
    const general = useSideBarGeneral();

    return (
        <Sidebar {...props}>
            <SidebarContent>
                <AppSideBarHeader />
                <AppSideBarMenu items={dashboard} />
                <AppSideBarMenu label="Engage" items={projects} />
                <AppSideBarMenu label="Find & Manage" items={general} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};
