import {AigType} from '../types/AigType';
import {AigTypeBase, AigTypeDef} from '../types/AigTypeBase';

export class AigInputBoolean extends AigTypeBase<boolean, AigTypeDef> {
    public constructor() {
        super({
            type: AigType.Boolean,
            description: ''
        });
    }
}
