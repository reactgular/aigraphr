import {AppSideBarItem} from '@/components/sidebar/sidebar.types';
import {useMemo} from 'react';
import {AiFillDashboard, AiOutlineDashboard} from 'react-icons/ai';

export const useSideBarDashboard = (): AppSideBarItem[] => {
    return useMemo(
        () => [
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
        ],
        []
    );
};
