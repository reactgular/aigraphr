import {AudioWaveform, Command, GalleryVerticalEnd} from 'lucide-react';
import {ElementType, useMemo} from 'react';

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
                name: 'Acme Inc',
                logo: GalleryVerticalEnd,
                plan: 'Enterprise'
            },
            {
                name: 'Acme Corp.',
                logo: AudioWaveform,
                plan: 'Startup'
            },
            {
                name: 'Evil Corp.',
                logo: Command,
                plan: 'Free'
            }
        ],
        []
    );
};
