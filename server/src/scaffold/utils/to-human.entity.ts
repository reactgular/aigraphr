import {ScaffoldEntity} from '@/_deprecated/scaffold-entity.service';
import {Type} from '@nestjs/common';

/**
 * @deprecated Use `toHumanUtils` instead.
 */
export function toHumanEntity<Entity extends ScaffoldEntity>(
    entity: Type<Entity>
) {
    return entity.name.replace(/(Service|Controller|Entity|Dto)$/, '');
}
