import {GrNodeDefController} from '@/graph/controllers/gr-node-def.controller';
import {
    GrNodeDefsService,
    NODE_DEF_GROUPS
} from '@/graph/services/gr-node-defs.service';
import {CORE} from '@/nodes/core/core';
import {Module} from '@nestjs/common';

@Module({
    imports: [],
    controllers: [GrNodeDefController],
    providers: [
        GrNodeDefsService,
        {
            provide: NODE_DEF_GROUPS,
            useValue: [CORE]
        }
    ],
    exports: [GrNodeDefsService]
})
export class GraphModule {}
