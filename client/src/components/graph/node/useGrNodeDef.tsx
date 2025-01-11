import type {GrNodeDefDto} from '@/api';
import {useGrNodeContext} from '@/components/graph/node/useGrNodeContext';
import {useGrNodeDefDto} from '@/components/hooks/useGrNodeDefDto';

export const useGrNodeDef = (): Readonly<GrNodeDefDto> => {
    const {data} = useGrNodeContext();
    return useGrNodeDefDto(data.type);
};
