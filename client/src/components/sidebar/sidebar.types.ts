import {IconType} from 'react-icons';

export interface AppSideBarItem {
    icons: {
        active: IconType;
        inactive: IconType;
    };

    links: {
        activate: string;
        isActive: string;
    };

    title: string;
}
