import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/shadcn/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from '@/components/shadcn/ui/sidebar';
import {
    BookOpen,
    Bot,
    ChevronRight,
    Settings2,
    SquareTerminal
} from 'lucide-react';
import {FC} from 'react';

const ITEMS = [
    {
        title: 'Playground',
        url: '#',
        icon: SquareTerminal,
        isActive: true,
        items: [
            {
                title: 'History',
                url: '#'
            },
            {
                title: 'Starred',
                url: '#'
            },
            {
                title: 'Settings',
                url: '#'
            }
        ]
    },
    {
        title: 'Models',
        url: '#',
        icon: Bot,
        items: [
            {
                title: 'Genesis',
                url: '#'
            },
            {
                title: 'Explorer',
                url: '#'
            },
            {
                title: 'Quantum',
                url: '#'
            }
        ]
    },
    {
        title: 'Documentation',
        url: '#',
        icon: BookOpen,
        items: [
            {
                title: 'Introduction',
                url: '#'
            },
            {
                title: 'Get Started',
                url: '#'
            },
            {
                title: 'Tutorials',
                url: '#'
            },
            {
                title: 'Changelog',
                url: '#'
            }
        ]
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings2,
        items: [
            {
                title: 'General',
                url: '#'
            },
            {
                title: 'Team',
                url: '#'
            },
            {
                title: 'Billing',
                url: '#'
            },
            {
                title: 'Limits',
                url: '#'
            }
        ]
    }
];

/**
 * @deprecated this is an example on how to do collapsible submenus
 */
export const NavCollapsible: FC = () => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {ITEMS.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                <a href={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};
