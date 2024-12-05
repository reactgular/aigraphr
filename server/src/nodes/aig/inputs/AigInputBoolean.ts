import {AigType} from '@/nodes/aig/types/AigType';
import {AigTypeBase, AigTypeDef} from '@/nodes/aig/types/AigTypeBase';

export class AigInputBoolean extends AigTypeBase<boolean, AigTypeDef> {
    public constructor() {
        super({
            type: AigType.Boolean,
            description: ''
        });
    }
}
