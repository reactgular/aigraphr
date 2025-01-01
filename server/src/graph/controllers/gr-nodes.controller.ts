import {GrNodeDto} from '@/graph/dtos/gr-node.dto';
import {GrNodesService} from '@/graph/services/gr-nodes.service';
import {scaReadOnlyMixin} from '@/scaffold/mixins/sca-readonly.mixin';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Graph')
@Controller('graph/nodes')
export class GrNodesController extends scaReadOnlyMixin({
    dto: GrNodeDto
}) {
    public constructor(private readonly grNodes: GrNodesService) {
        super();
    }

    public crud() {
        return this.grNodes;
    }
}
