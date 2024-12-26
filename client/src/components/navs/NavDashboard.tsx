import {AppSearchForm} from '@/components/app/AppSearchForm';
import {Button} from '@/components/shadcn/ui/button';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/shadcn/ui/sidebar';
import {CircleGauge} from 'lucide-react';
import type {FC} from 'react';
import {Link} from 'react-router';

export interface NavDashboardProps {
    projectId: number;
}

export const NavDashboard: FC<NavDashboardProps> = ({projectId}) => {
    return (
        <SidebarGroup className="gap-3">
            <Button>Create new workspace</Button>
            <AppSearchForm />
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link to={`/projects/${projectId}/dashboard`}>
                            <CircleGauge />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};
