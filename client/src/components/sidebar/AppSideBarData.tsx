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
        file: 'Open APIs',
        state: 'U'
    },
    {
        file: 'Project Database',
        state: 'M'
    }
];

/**
 * @deprecated
 */
export const AppSideBarData: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Find & Manage</SidebarGroupLabel>
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
