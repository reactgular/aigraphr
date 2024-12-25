import {AppSideBarItem} from '@/components/sidebar/sidebar.types';
import {useMemo} from 'react';
import {AiFillDashboard, AiOutlineDashboard} from 'react-icons/ai';

export const useSideBarGeneral = (): AppSideBarItem[] => {
    return useMemo(
        () => [
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
        ],
        []
    );
};
