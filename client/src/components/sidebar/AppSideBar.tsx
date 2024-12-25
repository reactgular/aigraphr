import {Button} from '@/components/shadcn/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarRail
} from '@/components/shadcn/ui/sidebar';
import {AppSideBarHeader} from '@/components/sidebar/AppSideBarHeader';
import {AppSideBarMenu} from '@/components/sidebar/AppSideBarMenu';
import {AppSideBarSearch} from '@/components/sidebar/AppSideBarSearch';
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
            <AppSideBarHeader />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-4">
                        <Button className="w-full">Create new workspace</Button>
                        <AppSideBarSearch />
                    </SidebarGroupContent>
                </SidebarGroup>
                <AppSideBarMenu items={dashboard} />
                <AppSideBarMenu label="Engage" items={projects} />
                <AppSideBarMenu label="Find & Manage" items={general} />
            </SidebarContent>
            <SidebarFooter>FOOTER</SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
