import {GrNodesController} from '@/graph/controllers/gr-nodes.controller';
import {GrNodesService, NODE_GROUPS} from '@/graph/services/gr-nodes.service';
import {CORE} from '@/nodes/core/core';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    controllers: [GrNodesController],
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
