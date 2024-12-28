import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/shadcn/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/shadcn/ui/sidebar';
import {
    Folder,
    Forward,
    Frame,
    Map,
    MoreHorizontal,
    PieChart,
    Trash2
} from 'lucide-react';
import type {FC} from 'react';

const ITEMS = [
    {
        name: 'Design Engineering',
        url: '#',
        icon: Frame
    },
    {
        name: 'Sales & Marketing',
        url: '#',
        icon: PieChart
    },
    {
        name: 'Travel',
        url: '#',
        icon: Map
    }
];

/**
 * @deprecated this is an example on how to do menus with more actions
 */
export const NavMoreActions: FC = () => {
    const {isMobile} = useSidebar();

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
            <SidebarMenu>
                {ITEMS.map((workspace) => (
                    <SidebarMenuItem key={workspace.name}>
                        <SidebarMenuButton asChild>
                            <a href={workspace.url}>
                                <workspace.icon />
                                <span>{workspace.name}</span>
                            </a>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48 rounded-lg"
                                side={isMobile ? 'bottom' : 'right'}
                                align={isMobile ? 'end' : 'start'}
                            >
                                <DropdownMenuItem>
                                    <Folder className="text-muted-foreground" />
                                    <span>View Workspace</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Forward className="text-muted-foreground" />
                                    <span>Clone Workspace</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Trash2 className="text-muted-foreground" />
                                    <span>Delete Workspace</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <MoreHorizontal className="text-sidebar-foreground/70" />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
};
