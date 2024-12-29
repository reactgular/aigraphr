import {AppSearchForm} from '@/components/app/AppSearchForm';
import {Button} from '@/components/shadcn/ui/button';
import {SidebarGroup, SidebarMenu} from '@/components/shadcn/ui/sidebar';
import {UiSideBarItem} from '@/components/ui/UiSideBarItem';
import {CircleGauge} from 'lucide-react';
import type {FC} from 'react';

interface NavDashboardProps {
    projectId: number;
}

export const NavDashboard: FC<NavDashboardProps> = ({projectId}) => {
    return (
        <SidebarGroup className="gap-3">
            <Button>Create new workspace</Button>
            <AppSearchForm />
            <SidebarMenu>
                <UiSideBarItem
                    item={{
                        icon: CircleGauge,
                        label: 'Dashboard',
                        to: `/projects/${projectId}/dashboard`
                    }}
                />
            </SidebarMenu>
        </SidebarGroup>
    );
};
