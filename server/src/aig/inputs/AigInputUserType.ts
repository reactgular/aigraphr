import { AigType } from '../types/AigType';
import { AigTypeBase, AigTypeDef } from '../types/AigTypeBase';
import { AigUserType } from '../types/AigUserType';

export class AigInputUserType extends AigTypeBase<AigUserType, AigTypeDef> {
    public constructor() {
        super({
            type: AigType.UserType,
            description: ''
        });
    }
}
