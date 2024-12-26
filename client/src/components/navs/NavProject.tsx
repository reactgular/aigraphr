import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/shadcn/ui/sidebar';
import {Database, Workflow} from 'lucide-react';
import {FC} from 'react';
import {Link} from 'react-router';

export interface NavProjectProps {
    projectId: number;
}

export const NavProject: FC<NavProjectProps> = ({projectId}) => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Project</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link to={`/projects/${projectId}/workspaces`}>
                            <Workflow />
                            <span>Workspaces</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link to={`/projects/${projectId}/workspaces`}>
                            <Database />
                            <span>Databases</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};
