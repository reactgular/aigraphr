import {AppSearchForm} from '@/components/app/AppSearchForm';
import {Button} from '@/components/shadcn/ui/button';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/shadcn/ui/sidebar';
import {Database} from 'lucide-react';
import {FC} from 'react';
import {Link} from 'react-router';

export const NavDashboard: FC = () => {
    return (
        <SidebarGroup className="gap-3">
            <Button>Create new workspace</Button>
            <AppSearchForm />
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link to="/projects/1/dashboard">
                            <Database />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};
