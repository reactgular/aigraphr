import {
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/shadcn/ui/sidebar';
import type {FC} from 'react';
import {NavLink, type Path} from 'react-router';

export interface UiSideBarItem {
    icon: FC;

    label: string;

    to: string | Path;
}

export interface UiSideBarItemProps {
    item: UiSideBarItem;
}

export const UiSideBarItem: FC<UiSideBarItemProps> = ({item}) => {
    return (
        <SidebarMenuItem>
            <NavLink className="example" to={item.to}>
                {({isActive}) => (
                    <SidebarMenuButton isActive={isActive} asChild>
                        <span>
                            <item.icon />
                            <span>{item.label}</span>
                        </span>
                    </SidebarMenuButton>
                )}
            </NavLink>
        </SidebarMenuItem>
    );
};
