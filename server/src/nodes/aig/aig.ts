import {
    AigNodeIdToType,
    AigNodeType,
    AigNodeTypeToId
} from '@/nodes/aig/AigNodeType';
import {
    AigNodeBuilder,
    AigNodeBuilderOptions
} from '@/nodes/aig/nodes/AigNodeBuilder';

export const aig = {
    node: (options: AigNodeBuilderOptions) => AigNodeBuilder.create(options),
    nodeId: (type: AigNodeType): number | undefined => AigNodeTypeToId[type],
    nodeType: (id: number): AigNodeType | undefined => AigNodeIdToType[id]
};
