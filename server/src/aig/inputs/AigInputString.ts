import { AigType } from '../types/AigType';
import { AigTypeBase, AigTypeDef } from '../types/AigTypeBase';

export class AigInputString extends AigTypeBase<string, AigTypeDef> {
    public constructor() {
        super({
            type: AigType.String,
            description: ''
        });
    }
}
