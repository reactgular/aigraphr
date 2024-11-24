import { AigType } from '../types/AigType';
import { AigTypeBase, AigTypeDef } from '../types/AigTypeBase';

export class AigInputUserType extends AigTypeBase<string, AigTypeDef> {
    public constructor() {
        super({
            type: AigType.UserType,
            description: ''
        });
    }
}
