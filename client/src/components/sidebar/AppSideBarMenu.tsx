import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu
} from '@/components/shadcn/ui/sidebar';
import {AppSideBarMenuItem} from '@/components/sidebar/AppSideBarMenuItem';
import {AppSideBarItem} from '@/components/sidebar/sidebar.types';
import {FC} from 'react';

export interface AppSideBarMenuProps {
    items: Array<AppSideBarItem>;

    label?: string;
}

export const AppSideBarMenu: FC<AppSideBarMenuProps> = ({items, label}) => {
    return (
        <SidebarGroup>
            {label ? <SidebarGroupLabel>{label}</SidebarGroupLabel> : null}
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item, index) => (
                        <AppSideBarMenuItem key={index} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
