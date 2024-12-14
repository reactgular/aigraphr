import {ProController} from '@/projects/decorators/pro-controller';
import {
    EdgeCreateDto,
    EdgeDto,
    EdgeUpdateDto
} from '@/projects/entities/edge.entity';
import {projectCrudMixin} from '@/projects/mixins/project-crud.mixin';
import {EdgesService} from '@/projects/services/edges.service';

@ProController('edges')
export class EdgesController extends projectCrudMixin({
    paramId: 'edgeId',
    dto: EdgeDto,
    createDto: EdgeCreateDto,
    updateDto: EdgeUpdateDto
}) {
    public constructor(private readonly edges: EdgesService) {
        super();
    }
}
