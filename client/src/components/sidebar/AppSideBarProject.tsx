import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/shadcn/ui/sidebar';
import {File} from 'lucide-react';
import {FC} from 'react';

const data = [
    {
        file: 'Workspaces',
        state: 'U'
    },
    {
        file: 'Index',
        state: 'M'
    },
    {
        file: 'Tasks',
        state: 'M'
    },
    {
        file: 'Reports',
        state: 'M'
    },
    {
        file: 'Templates',
        state: 'M'
    }
];

/**
 * @deprecated
 */
export const AppSideBarProject: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Engage</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {data.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton>
                                <File />
                                {item.file}
                            </SidebarMenuButton>
                            <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
