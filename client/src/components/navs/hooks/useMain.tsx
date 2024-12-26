import type {LucideIcon} from 'lucide-react';
import {BookOpen, Bot, Settings2, SquareTerminal} from 'lucide-react';
import {useMemo} from 'react';

export interface MainDesc {
    icon?: LucideIcon;

    isActive?: boolean;

    items?: {
        title: string;
        url: string;
    }[];

    title: string;

    url: string;
}

export const useMain = (): MainDesc[] => {
    return useMemo(
        () => [
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
        ],
        []
    );
};
