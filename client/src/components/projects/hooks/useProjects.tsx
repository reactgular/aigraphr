import {Database} from 'lucide-react';
import type {ElementType} from 'react';
import {useMemo} from 'react';

/**
 * @deprecated will be replaced by ProjectDto
 */
export interface ProjectDesc {
    logo: ElementType;

    name: string;

    plan: string;
}

export const useProjects = (): ProjectDesc[] => {
    return useMemo(
        () => [
            {
                name: 'Project A',
                logo: Database,
                plan: 'project-a.aigraphr'
            },
            {
                name: 'Project B',
                logo: Database,
                plan: 'project-b.aigraphr'
            },
            {
                name: 'Project C',
                logo: Database,
                plan: 'project-c.aigraphr'
            }
        ],
        []
    );
};
