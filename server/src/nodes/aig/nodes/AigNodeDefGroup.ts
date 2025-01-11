import {GrNodeDefGroupDto} from '@/graph/dtos/gr-node-def-group.dto';
import {AigNodeDefBuilder} from '@/nodes/aig/nodes/AigNodeDefBuilder';
import {AigTypeShape} from '@/nodes/aig/types/AigTypeBase';

export interface AigNodeGroupOptions {
    description: string;

    name: string;
}

export class AigNodeDefGroup {
    public readonly description: string;

    public readonly name: string;

    private readonly nodes: AigNodeDefBuilder<AigTypeShape, AigTypeShape>[] =
        [];

    public constructor({name, description}: AigNodeGroupOptions) {
        this.name = name;
        this.description = description;
    }

    public static create(options: AigNodeGroupOptions) {
        return new AigNodeDefGroup(options);
    }

    public compile(): GrNodeDefGroupDto {
        return {
            description: this.description,
            name: this.name,
            nodes: this.nodes.map((node) => node.compile(this.name))
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public register(node: AigNodeDefBuilder<any, any>) {
        this.nodes.push(node);
    }
}
