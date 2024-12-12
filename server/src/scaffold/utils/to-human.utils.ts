import {ScaffoldEntity} from '@/scaffold/_deprecated/scaffold-entity.service';
import {Type} from '@nestjs/common';

export function toHumanUtils<Entity extends ScaffoldEntity>(
    entity: Type<Entity>
) {
    return entity.name.replace(/Entity$/, '');
}
