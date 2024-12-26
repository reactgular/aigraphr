import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/shadcn/ui/sidebar';
import {Database, Workflow} from 'lucide-react';
import {FC} from 'react';
import {NavLink} from 'react-router';

export interface NavProjectProps {
    projectId: number;
}

export const NavProject: FC<NavProjectProps> = ({projectId}) => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Project</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton isActive={true} asChild>
                        <NavLink to={`/projects/${projectId}/workspaces`}>
                            <Workflow />
                            <span>Workspaces</span>
                        </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <NavLink to={`/projects/${projectId}/workspaces`}>
                            <Database />
                            <span>Databases</span>
                        </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};
