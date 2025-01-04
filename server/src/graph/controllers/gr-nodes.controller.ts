import {GrNodesService} from '@/graph/services/gr-nodes.service';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Graph')
@Controller('graph/nodes')
export class GrNodesController {
    public constructor(private readonly grNodes: GrNodesService) {}
}
