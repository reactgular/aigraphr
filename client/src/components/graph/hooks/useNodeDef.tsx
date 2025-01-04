import type {GrNodeDefDto} from '@/api';
import {useNodeDefGroups} from '@/components/graph/hooks/useNodeDefGroups';

export const useNodeDef = (type: string): Readonly<GrNodeDefDto> => {
    const {nodes} = useNodeDefGroups();
    const node = nodes[type];
    if (!node) {
        throw new Error(`Node definition not found for type: ${type}`);
    }
    return node;
};
