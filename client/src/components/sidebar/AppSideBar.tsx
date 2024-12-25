import {
    Sidebar,
    SidebarContent,
    SidebarRail
} from '@/components/shadcn/ui/sidebar';
import {AppSideBarHeader} from '@/components/sidebar/AppSideBarHeader';
import {AppSideBarMenu} from '@/components/sidebar/AppSideBarMenu';
import {AppSideBarItem} from '@/components/sidebar/sidebar.types';
import {ComponentProps, FC} from 'react';
import {AiFillDashboard, AiOutlineDashboard} from 'react-icons/ai';

const menu1: AppSideBarItem[] = [
    {
        title: 'Dashboard',
        icons: {
            active: AiFillDashboard,
            inactive: AiOutlineDashboard
        },
        links: {
            activate: '/projects/1/dashboard',
            isActive: '/projects/1/dashboard'
        }
    }
];

const menu2: AppSideBarItem[] = [
    {
        title: 'Workspaces',
        icons: {
            active: AiFillDashboard,
            inactive: AiOutlineDashboard
        },
        links: {
            activate: '/projects/1/workspaces',
            isActive: '/projects/1/workspaces'
        }
    },
    {
        title: 'Inbox',
        icons: {
            active: AiFillDashboard,
            inactive: AiOutlineDashboard
        },
        links: {
            activate: '/projects/1/inbox',
            isActive: '/projects/1/inbox'
        }
    },
    {
        title: 'Tasks',
        icons: {
            active: AiFillDashboard,
            inactive: AiOutlineDashboard
        },
        links: {
            activate: '/projects/1/tasks',
            isActive: '/projects/1/tasks'
        }
    },
    {
        title: 'Reports',
        icons: {
            active: AiFillDashboard,
            inactive: AiOutlineDashboard
        },
        links: {
            activate: '/projects/1/reports',
            isActive: '/projects/1/reports'
        }
    },
    {
        title: 'Templates',
        icons: {
            active: AiFillDashboard,
            inactive: AiOutlineDashboard
        },
        links: {
            activate: '/projects/1/templates',
            isActive: '/projects/1/templates'
        }
    }
];

const menu3: AppSideBarItem[] = [
    {
        title: 'Open APIs',
        icons: {
            active: AiFillDashboard,
            inactive: AiOutlineDashboard
        },
        links: {
            activate: '/open-apis',
            isActive: '/open-apis'
        }
    },
    {
        title: 'Project Database',
        icons: {
            active: AiFillDashboard,
            inactive: AiOutlineDashboard
        },
        links: {
            activate: '/templates',
            isActive: '/templates'
        }
    }
];

export const AppSideBar: FC<ComponentProps<typeof Sidebar>> = ({...props}) => {
    return (
        <Sidebar {...props}>
            <SidebarContent>
                <AppSideBarHeader />
                <AppSideBarMenu items={menu1} />
                <AppSideBarMenu label="Engage" items={menu2} />
                <AppSideBarMenu label="Find & Manage" items={menu3} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};
