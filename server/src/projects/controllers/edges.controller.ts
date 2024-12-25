import {
    EdgeCreateDto,
    EdgeDto,
    EdgeUpdateDto
} from '@/projects/entities/edge.entity';
import {workspaceCrudMixin} from '@/projects/mixins/workspace-crud.mixin';
import {EdgesService} from '@/projects/services/edges.service';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Edges')
@Controller(`projects/:projectId/workspaces/:workspaceId/edges`)
export class EdgesController extends workspaceCrudMixin({
    paramId: 'edgeId',
    dto: EdgeDto,
    createDto: EdgeCreateDto,
    updateDto: EdgeUpdateDto
}) {
    public constructor(private readonly edges: EdgesService) {
        super();
    }
}
