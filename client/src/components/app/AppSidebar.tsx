import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/shadcn/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarRail
} from '@/components/shadcn/ui/sidebar';
import {ChevronRight, File, Folder} from 'lucide-react';
import {FC} from 'react';

// This is sample data.
const data = {
    changes: [
        {
            file: 'README.md',
            state: 'M'
        },
        {
            file: 'api/hello/route.ts',
            state: 'U'
        },
        {
            file: 'app/layout.tsx',
            state: 'M'
        }
    ],
    tree: [
        [
            'app',
            [
                'api',
                ['hello', ['route.ts']],
                'page.tsx',
                'layout.tsx',
                ['blog', ['page.tsx']]
            ]
        ],
        [
            'components',
            ['ui', 'button.tsx', 'card.tsx'],
            'header.tsx',
            'footer.tsx'
        ],
        ['lib', ['util.ts']],
        ['public', 'favicon.ico', 'vercel.svg'],
        '.eslintrc.json',
        '.gitignore',
        'next.config.js',
        'tailwind.config.js',
        'package.json',
        'README.md'
    ]
};

export const AppSidebar: FC<React.ComponentProps<typeof Sidebar>> = ({
    ...props
}) => {
    return (
        <Sidebar {...props}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Engage</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.changes.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton>
                                        <File />
                                        {item.file}
                                    </SidebarMenuButton>
                                    <SidebarMenuBadge>
                                        {item.state}
                                    </SidebarMenuBadge>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Find & Manage</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.tree.map((item, index) => (
                                <Tree key={index} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Tree({item}: {item: string | Array<any>}) {
    const [name, ...items] = Array.isArray(item) ? item : [item];

    if (!items.length) {
        return (
            <SidebarMenuButton
                isActive={name === 'button.tsx'}
                className="data-[active=true]:bg-transparent"
            >
                <File />
                {name}
            </SidebarMenuButton>
        );
    }

    return (
        <SidebarMenuItem>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                defaultOpen={name === 'components' || name === 'ui'}
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ChevronRight className="transition-transform" />
                        <Folder />
                        {name}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {items.map((subItem, index) => (
                            <Tree key={index} item={subItem} />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    );
}
