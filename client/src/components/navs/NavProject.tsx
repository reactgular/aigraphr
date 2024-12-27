import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu
} from '@/components/shadcn/ui/sidebar';
import {UiSideBarItem} from '@/components/ui/sidebar/UiSideBarItem';
import {Database, Images, Workflow} from 'lucide-react';
import type {FC} from 'react';

export interface NavProjectProps {
    projectId: number;
}

export const NavProject: FC<NavProjectProps> = ({projectId}) => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Project</SidebarGroupLabel>
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
