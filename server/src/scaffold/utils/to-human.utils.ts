import {ScaffoldEntity} from '@/scaffold/services/scaffold-crud.service';
import {Type} from '@nestjs/common';

export function toHumanUtils<Entity extends ScaffoldEntity>(
    entity: Type<Entity>
) {
    return entity.name.replace(/Entity$/, '');
}
