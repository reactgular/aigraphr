import {AigNodeBuilder} from '@/nodes/aig/nodes/AigNodeBuilder';
import {AigTypeShape} from '@/nodes/aig/types/AigTypeBase';

export interface AigNodeGroupOptions {
    description: string;

    name: string;
}

export class AigNodeGroup {
    private readonly nodes: AigNodeBuilder<AigTypeShape, AigTypeShape>[] = [];

    public constructor(private readonly options: AigNodeGroupOptions) {}

    public static create(options: AigNodeGroupOptions) {
        return new AigNodeGroup(options);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public register(node: AigNodeBuilder<any, any>) {
        this.nodes.push(node);
    }
}
