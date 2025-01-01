import {GrNodesController} from '@/graph/controllers/gr-nodes.controller';
import {GrNodesService} from '@/graph/services/gr-nodes.service';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    controllers: [GrNodesController],
    providers: [GrNodesService],
    exports: [GrNodesService]
})
export class GraphModule {}
