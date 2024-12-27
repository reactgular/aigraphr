import {cn} from '@/components/shadcn/lib/utils';
import {
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/shadcn/ui/sidebar';
import type {FC} from 'react';
import {NavLink, type Path} from 'react-router';

export interface UiSideBarItem {
    icon: FC<Partial<HTMLElement>>;

    label: string;

    to: string | Path;
}

export interface UiSideBarItemProps {
    item: UiSideBarItem;
}

export const UiSideBarItem: FC<UiSideBarItemProps> = ({item}) => {
    return (
        <SidebarMenuItem>
            <NavLink to={item.to}>
                {({isActive}) => (
                    <SidebarMenuButton
                        className={
                            'data-[active=true]:bg-primary/10 data-[active=true]:font-[500]'
                        }
                        isActive={isActive}
                        asChild
                    >
                        <span>
                            <item.icon
                                className={cn({'text-primary': isActive})}
                            />
                            <span>{item.label}</span>
                        </span>
                    </SidebarMenuButton>
                )}
            </NavLink>
        </SidebarMenuItem>
    );
};
