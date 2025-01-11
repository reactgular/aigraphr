import type {GrNodeDefDto} from '@/api';
import {useGrNodeDefGetNodeDefGroups} from '@/components/hooks/useGrNodeDefGetNodeDefGroups';

export const useGrNodeDefDto = (type: string): Readonly<GrNodeDefDto> => {
    const {nodes} = useGrNodeDefGetNodeDefGroups();
    const node = nodes[type];
    if (!node) {
        throw new Error(`Node definition not found for type: ${type}`);
    }
    return node;
};
