import type {GrNodeDefGroupDto} from '@/api';
import {useGrNodeDefGetNodeDefGroups} from '@/components/hooks/useGrNodeDefGetNodeDefGroups';

export const useGrNodeDefGroupDto = (
    groupName: string
): Readonly<GrNodeDefGroupDto> => {
    const {groups} = useGrNodeDefGetNodeDefGroups();
    const group = groups[groupName];
    if (!group) {
        throw new Error(`Group ${groupName} not found`);
    }
    return group;
};
