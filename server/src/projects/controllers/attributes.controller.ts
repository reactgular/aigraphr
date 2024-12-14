import {ProController} from '@/projects/decorators/pro-controller';
import {
    AttributeCreateDto,
    AttributeDto,
    AttributeUpdateDto
} from '@/projects/entities/attribute.entity';
import {projectCrudMixin} from '@/projects/mixins/project-crud.mixin';
import {AttributesService} from '@/projects/services/attributes.service';

@ProController('attributes')
export class AttributesController extends projectCrudMixin({
    paramId: 'attributeId',
    dto: AttributeDto,
    createDto: AttributeCreateDto,
    updateDto: AttributeUpdateDto
}) {
    public constructor(private readonly attributes: AttributesService) {
        super();
    }
}
