import {
    AigNodeBuilderOptions,
    AigNodeDefBuilder
} from '@/nodes/aig/nodes/AigNodeDefBuilder';
import {
    AigNodeDefGroup,
    AigNodeGroupOptions
} from '@/nodes/aig/nodes/AigNodeDefGroup';

export const aig = {
    group: (options: AigNodeGroupOptions) => {
        return AigNodeDefGroup.create(options);
    },
    node: (options: AigNodeBuilderOptions) => AigNodeDefBuilder.create(options)
};
