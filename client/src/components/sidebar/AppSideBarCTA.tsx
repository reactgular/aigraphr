import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/shadcn/ui/sidebar';
import {File} from 'lucide-react';
import {FC} from 'react';

const data = [
    {
        file: 'Dashboard',
        state: 'M'
    }
];

export const AppSideBarCTA: FC = () => {
    return (
        <SidebarGroup>
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
