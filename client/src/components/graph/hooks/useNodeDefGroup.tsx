import type {GrNodeDefGroupDto} from '@/api';
import {useNodeDefGroups} from '@/components/graph/hooks/useNodeDefGroups';

export const useNodeDefGroup = (
    groupName: string
): Readonly<GrNodeDefGroupDto> => {
    const {groups} = useNodeDefGroups();
    const group = groups[groupName];
    if (!group) {
        throw new Error(`Group ${groupName} not found`);
    }
    return group;
};
