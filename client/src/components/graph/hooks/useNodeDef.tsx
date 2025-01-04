import type {GrNodeDefDto} from '@/api';
import {useNodeDefGroups} from '@/components/graph/hooks/useNodeDefGroups';

export const useNodeDef = (
    group: string,
    type: string
): Readonly<GrNodeDefDto> => {
    const {nodes} = useNodeDefGroups();
    const node = nodes[`${group}:${type}`];
    if (!node) {
        throw new Error(`Node ${group}:${type} not found`);
    }
    return node;
};
