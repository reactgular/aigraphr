import {
    GrNodeContext,
    type GrNodeType
} from '@/components/graph/node/GrNodeContext';
import type {NodeProps} from '@xyflow/react';
import {useContext} from 'react';

export const useGrNodeContext = (): NodeProps<GrNodeType> => {
    const node = useContext(GrNodeContext);
    if (node === null) {
        throw new Error(
            'useGrNodeContext must be used inside a GrNodeContext.Provider'
        );
    }
    return node;
};
