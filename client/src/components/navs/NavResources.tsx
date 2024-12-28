import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu
} from '@/components/shadcn/ui/sidebar';
import {UiSideBarItem} from '@/components/ui/UiSideBarItem';
import {Database, Images, Workflow} from 'lucide-react';
import type {FC} from 'react';

export interface NavProjectProps {
    projectId: number;
}

export const NavResources: FC<NavProjectProps> = ({projectId}) => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Resources</SidebarGroupLabel>
            <SidebarMenu>
                <UiSideBarItem
                    item={{
                        icon: Workflow,
                        label: 'Workspaces',
                        to: `/projects/${projectId}/workspaces`
                    }}
                />
                <UiSideBarItem
                    item={{
                        icon: Database,
                        label: 'Databases',
                        to: `/projects/${projectId}/databases`
                    }}
                />
                <UiSideBarItem
                    item={{
                        icon: Images,
                        label: 'Media',
                        to: `/projects/${projectId}/media`
                    }}
                />
            </SidebarMenu>
        </SidebarGroup>
    );
};
