import { AigInputType } from './AigInputType';
import { AigInputBase, AigInputDef } from './AigInputBase';

export class AigInputUserType extends AigInputBase<string, AigInputDef> {
    public constructor() {
        super({
            type: AigInputType.UserType,
            description: ''
        });
    }
}
