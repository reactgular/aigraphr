import {
    AigNodeBuilder,
    AigNodeBuilderOptions
} from '@/nodes/aig/nodes/AigNodeBuilder';
import {
    AigNodeGroup,
    AigNodeGroupOptions
} from '@/nodes/aig/nodes/AigNodeGroup';

export const aig = {
    group: (options: AigNodeGroupOptions) => {
        return AigNodeGroup.create(options);
    },
    node: (options: AigNodeBuilderOptions) => AigNodeBuilder.create(options)
};
