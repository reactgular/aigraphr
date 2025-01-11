import type {GrNodeDefDto} from '@/api';
import {useGrNode} from '@/components/graph/hooks/useGrNode';
import {useGrNodeDefDto} from '@/components/hooks/useGrNodeDefDto';

export const useGrNodeDef = (): Readonly<GrNodeDefDto> => {
    const node = useGrNode();
    return useGrNodeDefDto(node.type);
};
