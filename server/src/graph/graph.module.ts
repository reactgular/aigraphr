import {GraphController} from '@/graph/controllers/graph.controller';
import {GrNodesService, NODE_GROUPS} from '@/graph/services/gr-nodes.service';
import {CORE} from '@/nodes/core/core';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    controllers: [GraphController],
    providers: [
        GrNodesService,
        {
            provide: NODE_GROUPS,
            useValue: [CORE]
        }
    ],
    exports: [GrNodesService]
})
export class GraphModule {}
