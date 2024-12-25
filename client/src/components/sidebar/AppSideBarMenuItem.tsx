import {
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/shadcn/ui/sidebar';
import {AppSideBarItem} from '@/components/sidebar/sidebar.types';
import {FC} from 'react';
import {Link} from 'react-router';

export interface AppSideBarMenuItemProps {
    item: AppSideBarItem;
}

export const AppSideBarMenuItem: FC<AppSideBarMenuItemProps> = ({
    item: {
        icons: {inactive: Inactive, active: Active},
        links: {activate, isActive},
        title
    }
}) => {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link to={activate}>
                    <Inactive />
                    {title}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};
