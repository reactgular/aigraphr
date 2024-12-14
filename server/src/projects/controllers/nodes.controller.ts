import {
    NodeCreateDto,
    NodeDto,
    NodeUpdateDto
} from '@/projects/entities/node.entity';
import {workspaceCrudMixin} from '@/projects/mixins/workspace-crud.mixin';
import {NodesService} from '@/projects/services/nodes.service';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Nodes')
@Controller(`projects/:projectId/workspaces/:workspaceId/nodes`)
export class NodesController extends workspaceCrudMixin({
    paramId: 'nodeId',
    dto: NodeDto,
    createDto: NodeCreateDto,
    updateDto: NodeUpdateDto
}) {
    public constructor(private readonly nodes: NodesService) {
        super();
    }
}
