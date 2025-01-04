import {AigNodeGroup} from '@/nodes/aig/nodes/AigNodeGroup';
import {Inject, Injectable} from '@nestjs/common';

export const NODE_GROUPS = Symbol('NODE_GROUPS');

@Injectable()
export class GrNodesService {
    public constructor(
        @Inject(NODE_GROUPS) private readonly nodeGroups: AigNodeGroup[]
    ) {}
}
