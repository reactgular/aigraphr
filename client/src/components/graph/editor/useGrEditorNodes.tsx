import type {NodeDto} from '@/api';
import type {GrNodeType} from '@/components/graph/node/GrNodeContext';
import {
    type NodeDefModel,
    useGrNodeDefGetNodeDefGroups
} from '@/components/hooks/useGrNodeDefGetNodeDefGroups';
import {useMemo} from 'react';

function toGrNodeType(model: NodeDefModel) {
    return (data: NodeDto): GrNodeType => {
        const nodeDef = model.nodes[data.type];
        const inputs = Math.max(nodeDef.inputs.length, nodeDef.outputs.length);

        return {
            id: data.id.toString(),
            type: 'GrNode',
            position: {x: data.id * 225, y: 0},
            width: 200,
            height: 120 + inputs * 24,
            data
        };
    };
}

export const useGrEditorNodes = (nodes: Array<NodeDto>): Array<GrNodeType> => {
    const model = useGrNodeDefGetNodeDefGroups();
    return useMemo(() => nodes.map(toGrNodeType(model)), [nodes]);
};
