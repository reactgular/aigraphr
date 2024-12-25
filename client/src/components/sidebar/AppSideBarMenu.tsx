import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/shadcn/ui/sidebar';
import {FC} from 'react';
import {IconType} from 'react-icons';

export interface AppSideBarMenuItem {
    icons: {
        active: IconType;
        inactive: IconType;
    };

    links?: {
        activate: string;
        isActive: string;
    };

    title: string;
}

export interface AppSideBarMenuProps {
    items: Array<AppSideBarMenuItem>;

    label?: string;
}

export const AppSideBarMenu: FC<AppSideBarMenuProps> = ({items, label}) => {
    return (
        <SidebarGroup>
            {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map(
                        (
                            {
                                icons: {inactive: Inactive, active: Active},
                                title
                            },
                            index
                        ) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton>
                                    <Inactive />
                                    {title}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
