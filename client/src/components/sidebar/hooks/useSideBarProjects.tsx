import {AppSideBarItem} from '@/components/sidebar/sidebar.types';
import {useMemo} from 'react';
import {AiFillDashboard, AiOutlineDashboard} from 'react-icons/ai';

export const useSideBarProjects = (): AppSideBarItem[] => {
    return useMemo(
        () => [
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
        ],
        []
    );
};
