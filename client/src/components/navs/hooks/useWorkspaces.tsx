import type {LucideIcon} from 'lucide-react';
import {Frame, Map, PieChart} from 'lucide-react';
import {useMemo} from 'react';

/**
 * @deprecated to be replaced by WorkspaceDto
 */
export interface WorkspaceDesc {
    icon: LucideIcon;

    name: string;

    url: string;
}

export const useWorkspaces = (): WorkspaceDesc[] => {
    return useMemo(
        () => [
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
        ],
        []
    );
};
