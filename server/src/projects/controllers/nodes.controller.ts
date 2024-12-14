import {ProController} from '@/projects/decorators/pro-controller';
import {
    NodeCreateDto,
    NodeDto,
    NodeUpdateDto
} from '@/projects/entities/node.entity';
import {projectCrudMixin} from '@/projects/mixins/project-crud.mixin';
import {NodesService} from '@/projects/services/nodes.service';

@ProController('nodes')
export class NodesController extends projectCrudMixin({
    paramId: 'nodeId',
    dto: NodeDto,
    createDto: NodeCreateDto,
    updateDto: NodeUpdateDto
}) {
    public constructor(private readonly nodes: NodesService) {
        super();
    }
}
