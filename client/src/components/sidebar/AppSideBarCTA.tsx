import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
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

/**
 * @deprecated
 */
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
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
