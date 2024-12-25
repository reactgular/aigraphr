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
            <SidebarMenuButton
                className="h-auto bg-primary/[10%] font-bold"
                asChild
            >
                <Link to={activate}>
                    <span>
                        <Inactive className="text-primary" size={20} />
                    </span>
                    {title}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};
