import {GrNodesController} from '@/graph/controllers/gr-nodes.controller';
import {CORE_NODES, GrNodesService} from '@/graph/services/gr-nodes.service';
import {coreNodes} from '@/nodes/examples/simple';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    controllers: [GrNodesController],
    providers: [
        GrNodesService,
        {
            provide: CORE_NODES,
            useValue: coreNodes
        }
    ],
    exports: [GrNodesService]
})
export class GraphModule {}
