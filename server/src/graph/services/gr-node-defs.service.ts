import {GrNodeDefGroupDto} from '@/graph/dtos/gr-node-def-group.dto';
import {GrNodeDefDto} from '@/graph/dtos/gr-node-def.dto';
import {AigNodeDefGroup} from '@/nodes/aig/nodes/AigNodeDefGroup';
import {Inject, Injectable, NotFoundException} from '@nestjs/common';

export const NODE_DEF_GROUPS = Symbol('NODE_DEF_GROUPS');

@Injectable()
export class GrNodeDefsService {
    private readonly compiled: ReadonlyMap<string, GrNodeDefGroupDto>;

    private readonly groups: ReadonlyMap<string, AigNodeDefGroup>;

    private readonly index: ReadonlyArray<string>;

    public constructor(
        @Inject(NODE_DEF_GROUPS)
        nodeDefGroups: AigNodeDefGroup[]
    ) {
        const groups = new Map<string, AigNodeDefGroup>();
        const compiled = new Map<string, GrNodeDefGroupDto>();
        nodeDefGroups.forEach((group) => {
            if (groups.has(group.name)) {
                throw new Error(`Group with name ${group.name} already exists`);
            }
            groups.set(group.name, group);
            compiled.set(group.name, group.compile());
        });
        this.groups = groups;
        this.compiled = compiled;
        this.index = Array.from(groups.keys()).sort();
    }

    public getGroup(name: string): GrNodeDefGroupDto {
        const group = this.compiled.get(name);
        if (!group) {
            throw new NotFoundException(`Group with name ${name} not found`);
        }
        return group;
    }

    public getGroups(): GrNodeDefGroupDto[] {
        return this.index.map((name) => this.compiled.get(name)!);
    }

    public getNode(group: string, type: string): GrNodeDefDto {
        const groupDef = this.getGroup(group);
        const node = groupDef.nodes.find((node) => node.type === type);
        if (!node) {
            throw new NotFoundException(
                `Node with type ${type} not found in group ${group}`
            );
        }
        return node;
    }
}
