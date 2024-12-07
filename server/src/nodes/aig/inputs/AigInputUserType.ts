import {AigType} from '../types/AigType';
import {AigTypeBase, AigTypeDef} from '../types/AigTypeBase';
import {AigValueUserType} from '../values/AigValueUserType';

export class AigInputUserType extends AigTypeBase<
    AigValueUserType,
    AigTypeDef
> {
    public constructor() {
        super({
            type: AigType.UserType,
            description: ''
        });
    }
}
